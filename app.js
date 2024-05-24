const readline = require('readline');
const FacilityBookingSystem = require('./facilityBookingSystem');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bookingSystem = new FacilityBookingSystem();

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
    while (true) {
        const facilityName = await askQuestion('Enter facility name (Clubhouse/Tennis Court): ');
        const date = await askQuestion('Enter date (DD-MM-YYYY): ');
        const startTime = await askQuestion('Enter start time (HH:MM): ');
        const endTime = await askQuestion('Enter end time (HH:MM): ');

        try {
            const cost = bookingSystem.book(facilityName, date, startTime, endTime);
            console.log(`Booked, Rs. ${cost}`);
        } catch (error) {
            console.log(error.message);
        }

        const continueBooking = await askQuestion('Do you want to book another facility? (yes/no): ');
        if (continueBooking.toLowerCase() !== 'yes') {
            break;
        }
    }

    rl.close();
}

main();
