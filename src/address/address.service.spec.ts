import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Address),
          useValue: {
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn().mockImplementation((address) =>
              Promise.resolve({ id: 1, ...address }),
            ),
            findOne: jest.fn().mockImplementation(() => Promise.resolve(null)),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should create an address', async () => {
    const mockResponse: AxiosResponse = {
      data: {
        features: [
          {
            properties: {
              label: '8 Boulevard du Port 80000 Amiens',
              housenumber: '8',
              street: 'Boulevard du Port',
              postcode: '80000',
              citycode: '80021',
            },
            geometry: {
              coordinates: [2.290084, 49.897443], // [longitude, latitude]
            },
          },
        ],
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {
          set: jest.fn(),
          get: jest.fn(),
          has: jest.fn(),
          delete: jest.fn(),
        } as any,
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await service.createAddress('8 bd du port');
    expect(result.label).toBe('8 Boulevard du Port 80000 Amiens');
    expect(result.latitude).toBe(49.897443);
    expect(result.longitude).toBe(2.290084);
    expect(httpService.get).toHaveBeenCalledWith(
      'https://api-adresse.data.gouv.fr/search/',
      expect.objectContaining({
        params: { q: '8 bd du port', limit: 1 },
      }),
    );
  });
});