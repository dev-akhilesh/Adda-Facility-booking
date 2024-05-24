const FacilityBookingSystem = require('./facilityBookingSystem');

describe('FacilityBookingSystem', () => {
    let bookingSystem;

    beforeEach(() => {
        bookingSystem = new FacilityBookingSystem();
    });

    const futureDate = '26-12-2024'; // Ensure this date is in the future

    test('should book Clubhouse and calculate correct cost', () => {
        const cost = bookingSystem.book('Clubhouse', futureDate, '16:00', '22:00');
        expect(cost).toBe(3000); // 6 hours at Rs. 500/hour
    });

    test('should book Tennis Court and calculate correct cost', () => {
        const cost = bookingSystem.book('Tennis Court', futureDate, '16:00', '20:00');
        expect(cost).toBe(200); // 4 hours at Rs. 50/hour
    });

    test('should fail booking if facility already booked', () => {
        bookingSystem.book('Clubhouse', futureDate, '16:00', '22:00');
        expect(() => {
            bookingSystem.book('Clubhouse', futureDate, '16:00', '22:00');
        }).toThrow('Booking Failed, Already Booked');
    });

    test('should fail booking if end time is before start time', () => {
        expect(() => {
            bookingSystem.book('Tennis Court', futureDate, '20:00', '16:00');
        }).toThrow('End time must be after start time');
    });

    test('should fail booking if date is in the past', () => {
        const pastDate = new Date();
        pastDate.setDate(pastDate.getDate() - 1);
        const pastDateString = `${pastDate.getDate().toString().padStart(2, '0')}-${(pastDate.getMonth() + 1).toString().padStart(2, '0')}-${pastDate.getFullYear()}`;
        expect(() => {
            bookingSystem.book('Tennis Court', pastDateString, '16:00', '18:00');
        }).toThrow('Date must be greater than the current date');
    });
});
