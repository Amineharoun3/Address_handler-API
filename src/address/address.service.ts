import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async createAddress(query: string) {
    if (!query || typeof query !== 'string') {
      throw new HttpException(
        'Le champ "q" est requis et doit être une chaîne non vide.',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      console.log(`Envoi de la requête à l'API externe pour q=${query}`);
      const response = await firstValueFrom(
        this.httpService.get('https://api-adresse.data.gouv.fr/search/', {
          params: { q: query, limit: 1 },
          timeout: 10000, // Augmenté à 10 secondes
        }),
      );

      console.log('Réponse de l’API externe:', JSON.stringify(response.data, null, 2));

      if (!response.data.features || response.data.features.length === 0) {
        throw new HttpException(
          'Adresse non trouvée. Aucun résultat ne correspond à votre recherche.',
          HttpStatus.NOT_FOUND,
        );
      }

      const props = response.data.features[0].properties;
      const address = this.addressRepository.create({
        label: props.label,
        housenumber: props.housenumber || '',
        street: props.street || '',
        postcode: props.postcode,
        citycode: props.citycode,
        latitude: response.data.features[0].geometry.coordinates[1], // Latitude
        longitude: response.data.features[0].geometry.coordinates[0], // Longitude
      });

      await this.addressRepository.save(address);
      return address;
    } catch (error) {
      console.error('Erreur lors de l’appel à l’API externe:', error.message, error.response?.data, error.stack);
      if (error instanceof HttpException) {
        throw error;
      }
      if (error.response) {
        const status = error.response.status;
        if (status === 429) {
          throw new HttpException(
            'Trop de requêtes à l\'API externe. Veuillez réessayer plus tard.',
            HttpStatus.TOO_MANY_REQUESTS,
          );
        }
        if (status === 503) {
          throw new HttpException(
            'L\'API externe est temporairement indisponible.',
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }
      }
      throw new HttpException(
        `Erreur serveur : impossible de contacter l'API externe. Détails: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getRisks(addressId: number) {
    const address = await this.addressRepository.findOne({ where: { id: addressId } });
    if (!address) {
      throw new HttpException('Adresse non trouvée.', HttpStatus.NOT_FOUND);
    }

    try {
      console.log(`Envoi de la requête Géorisques pour id=${addressId}`);
      const response = await firstValueFrom(
        this.httpService.get('https://georisques.gouv.fr/api/v1/resultats_rapport_risque', {
          params: { latlon: `${address.longitude},${address.latitude}` },
          timeout: 10000,
        }),
      );
      console.log('Réponse de Géorisques:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l’appel à Géorisques:', error.message, error.response?.data);
      throw new HttpException(
        'Erreur serveur : échec de la récupération des données de Géorisques.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll() {
    try {
      const addresses = await this.addressRepository.find();
      return addresses;
    } catch (error) {
      console.error('Erreur lors de la récupération des adresses:', error.message);
      throw new HttpException(
        'Erreur serveur : impossible de récupérer les adresses.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}