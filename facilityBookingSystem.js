class FacilityBookingSystem {
    constructor() {
        this.facilities = {
            'Clubhouse': { bookings: [], rates: [{ start: 10, end: 16, rate: 100 }, { start: 16, end: 22, rate: 500 }] },
            'Tennis Court': { bookings: [], rate: 50 }
        };
    }

    static parseTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours + minutes / 60;
    }

    static parseDate(date) {
        const [day, month, year] = date.split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    isTimeConflict(bookings, date, start, end) {
        return bookings.some(booking => booking.date.getTime() === date.getTime() &&
            ((start >= booking.start && start < booking.end) || (end > booking.start && end <= booking.end)));
    }

    book(facilityName, dateStr, startTime, endTime) {
        const facility = this.facilities[facilityName];
        if (!facility) {
            throw new Error('Invalid facility name');
        }

        const start = FacilityBookingSystem.parseTime(startTime);
        const end = FacilityBookingSystem.parseTime(endTime);
        if (start >= end) {
            throw new Error('End time must be after start time');
        }

        const date = FacilityBookingSystem.parseDate(dateStr);
        if (date < new Date()) {
            throw new Error('Date must be greater than the current date');
        }

        if (this.isTimeConflict(facility.bookings, date, start, end)) {
            throw new Error('Booking Failed, Already Booked');
        }

        facility.bookings.push({ date, start, end });

        let cost = 0;
        if (facilityName === 'Clubhouse') {
            facility.rates.forEach(rate => {
                if (start < rate.end && end > rate.start) {
                    const from = Math.max(start, rate.start);
                    const to = Math.min(end, rate.end);
                    cost += (to - from) * rate.rate;
                }
            });
        } else {
            cost = (end - start) * facility.rate;
        }

        return cost;
    }
}

module.exports = FacilityBookingSystem;
