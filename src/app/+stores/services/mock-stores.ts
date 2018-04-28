import { Store } from '../store';

var mockEmployees: string[] = ['1', '2'];
var mockEmployees2: string[] = ['3', '4'];

export const mockStores: Store[] = [
    {
        id: '1',
        name: 'Central Texas Marketplace',
        phone: '(254) 662-9240',
        address: '2448 W Loop 340 Waco, TX 76711',
        location: {
            lat: 31.49809,
            lng: -97.158254
        },
        hours: {
            sun: { open: 11, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        },
        employees: mockEmployees
    },
    {
        id: '2',
        name: 'I35 Bellmead',
        phone: '(254) 412-1039',
        address: '1517 N I 35 E Bellmead, TX 76705',
        location: {
            lat: 31.5999,
            lng: -97.107553
        },
        hours: {
            sun: { open: 11, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        },
        employees: mockEmployees2
    },
    {
        id: '3',
        name: 'Lake Air Court',
        phone: '(254) 751-9162',
        address: '1428 Wooded Acres Dr. Waco TX, 76710',
        location: {
            lat: 31.533358,
            lng: -97.190701
        },
        hours: {
            sun: { open: 11, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        },
        employees: []
    },
    {
        id: '4',
        name: 'Market Place',
        phone: '(254) 774-2703',
        address: '3022 S 31st St Temple, TX 76502',
        location: {
            lat: 31.070637,
            lng: -97.370154
        },
        hours: {
            sun: { open: 11, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        },
        employees: []
    },
    {
        id: '5',
        name: 'Sparta Rd Belton',
        phone: '(254) 939-7122',
        address: '209 Sparta Rd Belton TX 76513',
        location: {
            lat: 31.07987,
            lng: -97.460026
        },
        hours: {
            sun: { open: 11, close: 21 },
            mon: { open: 10, close: 21 },
            tue: { open: 10, close: 21 },
            wed: { open: 10, close: 21 },
            thu: { open: 10, close: 21 },
            fri: { open: 10, close: 21 },
            sat: { open: 10, close: 21 }
        },
        employees: []
    }
];
