import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Rental } from './rental/shared/rental.model';


export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const rentals: Rental[] = [{
            'id': '1',
            'title': 'Nice view on ocean',
            'city': 'San Francisco',
            'street': 'Main street',
            'category': 'condo',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/1/image.jpeg',
            'bedrooms': 4,
            'shared': false,
            'description': 'Very nice apartment in center of the city.',
            'dailyRate': 43,
            'createdAt': '24.12.2017'
            },
            {
            'id': '2',
            'title': 'Modern apartment in center',
            'city': 'New York',
            'street': 'Time Square',
            'category': 'apartment',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/2/image.jpeg',
            'bedrooms': 1,
            'shared': true,
            'description': 'Very nice apartment in center of the city.',
            'dailyRate': 11,
            'createdAt': '13.01.2018'
            },
            {
            'id': '3',
            'title': 'Beautiful house on square',
            'city': 'Berlin',
            'street': 'Unter den Linden 18',
            'category': 'house',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
            'bedrooms': 5,
            'shared': false,
            'description': 'Very nice housing in center of the city.',
            'dailyRate': 23,
            'createdAt': '27.02.2018'
          },
          {
            'id': '4',
            'title': 'Amazing modern place',
            'city': 'San Francisco',
            'street': 'Green street',
            'category': 'house',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/3/image.jpeg',
            'bedrooms': 2,
            'shared': false,
            'description': 'Hiking routes 10 min walking away',
            'dailyRate': 140,
            'createdAt': '17.03.2018'
            },
            {
            'id': '5',
            'title': 'Apartment In China Town',
            'city': 'San Francisco',
            'street': 'Union Street',
            'category': 'apartment',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/4/image.jpeg',
            'bedrooms': 3,
            'shared': false,
            'description': 'Very nice apartment in China Town',
            'dailyRate': 89,
            'createdAt': '01.04.2018'
            },
            {
            'id': '6',
            'title': 'House with Garden',
            'city': 'New York',
            'street': 'Long Island, Queens',
            'category': 'house',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
            'bedrooms': 6,
            'shared': false,
            'description': 'Very nice house in Long Island with garden',
            'dailyRate': 189,
            'createdAt': '15.05.2018'
          },
          {
            'id': '7',
            'title': 'Cozy modern Condo',
            'city': 'New York',
            'street': 'Penn Station',
            'category': 'condo',
            'image': 'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/6/image.jpeg',
            'bedrooms': 3,
            'shared': true,
            'description': 'Building close to Penn Station',
            'dailyRate': 68,
            'createdAt': '20.07.2018'
          }
        ];
        return { rentals };
    }

}
