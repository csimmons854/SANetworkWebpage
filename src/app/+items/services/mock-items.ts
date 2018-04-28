import { Item } from '../item';

export const mockItems: Item[] = [
    {
        id: '1',
        name: 'Smart Coffee Maker',
        powerState: false,
        fields: [
            {
                name: 'Alarm Time',
                value: '8:00 AM',
                hasOptions: false,
                options: [],
                valueValidation: '^([0-9]|0[0-9]|1[0-2]):[0-5][0-9] (([Aa]|[Pp])[Mm])'
            },
            {
                name: 'Email Address',
                value: 'testerino@test.com',
                hasOptions: false,
                options: [],
                valueValidation: '.*'
            }
            ]
    },
    {
        id: '2',
        name: 'Smart Blinds',
        powerState: false,
        fields: [
            {
                name: 'Alarm Time',
                value: '8:00 AM',
                hasOptions: false,
                options: [],
                valueValidation: '^([0-9]|0[0-9]|1[0-2]):[0-5][0-9] (([Aa]|[Pp])[Mm])'
            },
            {
                name: 'Brightness',
                value: 'Dim',
                hasOptions: true,
                options: ['Dimmest', 'Dimmer', 'Dim', 'Bright', 'Brighter', 'Brightest'],
                valueValidation: '.*'
            },
            {
                name: 'Email Address',
                value: 'testerino@test.com',
                hasOptions: false,
                options: [],
                valueValidation: '.*'
            }
        ]
    }
];
