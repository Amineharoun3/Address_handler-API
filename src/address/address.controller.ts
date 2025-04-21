import { Controller, Post, Body, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';


@ApiTags('Addresses')
@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({summary:'Créer une nouvelle adresse'})
  @ApiBody({type:CreateAddressDto})
  @ApiResponse({ status: 200, description: 'Adresse créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiResponse({ status: 404, description: 'Adresse non trouvée.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async create(@Body() createAddressDto: CreateAddressDto) {
    try {
      const address = await this.addressService.createAddress(createAddressDto.q);
      return address;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur serveur : impossible de contacter l\'API externe.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id/risks')
  @ApiOperation({ summary: 'Récupérer les risques pour une adresse' })
  @ApiParam({ name: 'id', description: 'ID de l\'adresse', example: 1 })
  @ApiResponse({ status: 200, description: 'Données des risques récupérées.' })
  @ApiResponse({ status: 404, description: 'Adresse non trouvée.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async getRisks(@Param('id') id: string) {
    try {
      const risks = await this.addressService.getRisks(+id);
      return risks;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur serveur : échec de la récupération des données de Géorisques.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les adresses stockées' })
  @ApiResponse({ status: 200, description: 'Liste des adresses.' })
  @ApiResponse({ status: 500, description: 'Erreur serveur.' })
  async findAll() {
    try {
      const addresses = await this.addressService.findAll();
      return addresses;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Erreur serveur : impossible de récupérer les adresses.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}