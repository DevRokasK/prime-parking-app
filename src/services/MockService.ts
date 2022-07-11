import { Vehicle } from "../model/Vehicle";
import { Permit } from "../model/Permit";
import { IPrimeParkingService } from "./IPrimeParkingService";


export class MockService implements IPrimeParkingService {
    public async GetVehicles(): Promise<Vehicle[]> {       
        
        const result: Vehicle[] = [];

        await new Promise(resolve => setTimeout(resolve, 2000));

        result.push(new Vehicle({
            carNumber: 'AAA 111',
            make: 'VW',
            model: 'Golf',
            registrationYear: new Date(2020, 4, 15),
            registrationPlace: 'Vilnius',
            fuelType: 'Petrol',
            enginePower: 125,
            engineTorque: 500,
            color: 'Silver',
            doors: 5
        }));

        result.push(new Vehicle({
            carNumber: 'BBB 111',
            make: 'BMW',
            model: 'X5',
            registrationYear: new Date(2010, 9, 5),
            registrationPlace: 'Kaunas',
            fuelType: 'Diesel',
            enginePower: 250,
            engineTorque: 800,
            color: 'Black',
            doors: 5
        }));

        result.push(new Vehicle({
            carNumber: 'CCC 111',
            make: 'Ford',
            model: 'Focus',
            registrationYear: new Date(2019, 9, 29),
            registrationPlace: 'Vilnius',
            fuelType: 'Petrol',
            enginePower: 85,
            engineTorque: 350,
            color: 'Blue',
            doors: 5
        }));

        result.push(new Vehicle({
            carNumber: 'CCC 101',
            make: 'VW',
            model: 'Passat',
            registrationYear: new Date(2022, 7, 15),
            registrationPlace: 'Vilnius',
            fuelType: 'Diesel',
            enginePower: 150,
            engineTorque: 400,
            color: 'Silver',
            doors: 5
        }));

        result.push(new Vehicle({
            carNumber: 'DDD 111',
            make: 'Ford',
            model: 'Fiesta',
            registrationYear: new Date(2018, 1, 1),
            registrationPlace: 'Kaunas',
            fuelType: 'Diesel',
            enginePower: 60,
            engineTorque: 200,
            color: 'White',
            doors: 3
        }));

        result.push(new Vehicle({
            carNumber: 'EEE 111',
            make: 'VW',
            model: 'Golf',
            registrationYear: new Date(2021, 8, 5),
            registrationPlace: 'Vilnius',
            fuelType: 'Diesel',
            enginePower: 75,
            engineTorque: 300,
            color: 'Blue',
            doors: 3
        }));

        result.push(new Vehicle({
            carNumber: 'FFF 111',
            make: 'Kia',
            model: "c'eed",
            registrationYear: new Date(2020, 4, 15),
            registrationPlace: 'Kaunas',
            fuelType: 'Petrol',
            enginePower: 50,
            engineTorque: 100,
            color: 'Silver',
            doors: 5
        }));

        return result;
    }

    public async GetPermits(): Promise<Permit[]> {
        const result: Permit[] = [];

        await new Promise(resolve => setTimeout(resolve, 2000));

        result.push(new Permit({
            carId: 'AAA 111',
            stayFrom: new Date(2020, 4, 15),
            stayUntil: new Date(2020, 4, 18),
            entered: new Date(2020, 4, 15),
            left: new Date(2020, 10, 15),
            state: 'Active'
        }));

        result.push(new Permit({
            carId: 'BBB 111',
            stayFrom: new Date(2020, 4, 15),
            stayUntil: new Date(2020, 4, 16),
            entered: new Date(2020, 4, 15),
            left: new Date(2020, 4, 17),
            state: 'Completed'
        }));

        result.push(new Permit({
            carId: 'CCC 111',
            stayFrom: new Date(2020, 9, 15),
            stayUntil: new Date(2020, 11, 15),
            entered: new Date(2020, 10, 15),
            left: new Date(2020, 10, 15),
            state: 'Active'
        }));

        return result;
    }
}