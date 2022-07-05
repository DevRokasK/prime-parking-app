import { Car } from "../model/Car";


export class MockService {
    public static GetCars(): Car[] {
        const result: Car[] = [];

        result.push(new Car({
            carId: 'AAA 111',
            make: 'VW',
            model: 'Golf',
            registrationDate: new Date(2020, 4, 15),
            registrationPlace: 'Vilnius',
            fuelType: 'Petrol',
            enginePower: 125,
            engineTorque: 500,
            color: 'Silver',
            doors: 5
        }));

        result.push(new Car({
            carId: 'BBB 111',
            make: 'BMW',
            model: 'X5',
            registrationDate: new Date(2010, 9, 5),
            registrationPlace: 'Kaunas',
            fuelType: 'Diesel',
            enginePower: 250,
            engineTorque: 800,
            color: 'Black',
            doors: 5
        }))

        result.push(new Car({
            carId: 'CCC 111',
            make: 'Ford',
            model: 'Focus',
            registrationDate: new Date(2019, 9, 29),
            registrationPlace: 'Vilnius',
            fuelType: 'Petrol',
            enginePower: 85,
            engineTorque: 350,
            color: 'Blue',
            doors: 5
        }))

        result.push(new Car({
            carId: 'CCC 111',
            make: 'VW',
            model: 'Passat',
            registrationDate: new Date(2022, 7, 15),
            registrationPlace: 'Vilnius',
            fuelType: 'Diesel',
            enginePower: 150,
            engineTorque: 400,
            color: 'Silver',
            doors: 5
        }))

        result.push(new Car({
            carId: 'DDD 111',
            make: 'Ford',
            model: 'Fiesta',
            registrationDate: new Date(2018, 1, 1),
            registrationPlace: 'Kaunas',
            fuelType: 'Diesel',
            enginePower: 60,
            engineTorque: 200,
            color: 'White',
            doors: 3
        }))

        result.push(new Car({
            carId: 'EEE 111',
            make: 'VW',
            model: 'Golf',
            registrationDate: new Date(2021, 8, 5),
            registrationPlace: 'Vilnius',
            fuelType: 'Diesel',
            enginePower: 75,
            engineTorque: 300,
            color: 'Blue',
            doors: 3
        }))

        result.push(new Car({
            carId: 'FFF 111',
            make: 'Kia',
            model: "c'eed",
            registrationDate: new Date(2020, 4, 15),
            registrationPlace: 'Kaunas',
            fuelType: 'Petrol',
            enginePower: 50,
            engineTorque: 100,
            color: 'Silver',
            doors: 5
        }))

        return result;
    }
}