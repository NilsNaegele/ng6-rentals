import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { Booking } from '../../booking/shared/booking.model';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  private getRangeOfDates(startAt, endAt, dateFormat) {
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
      tempDates.push(mStartAt.format(dateFormat));
      mStartAt = mStartAt.add(1, 'day');
    }

    tempDates.push(moment(startAt).format(dateFormat));
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
  }

  private formatDate(date, dateFormat) {
    return moment(date).format(dateFormat);
  }

  formatBookingDate(date) {
    return this.formatDate(date, Booking.DATE_FORMAT);
  }

  getBookingRangeOfDates(startAt, endAt) {
    return this.getRangeOfDates(startAt, endAt, Booking.DATE_FORMAT);
  }
}
