import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DaterangePickerComponent } from 'ng2-daterangepicker';

import { HelperService } from '../../../common/services/helper.service';
import { Booking } from '../../../booking/shared/booking.model';
import { Rental } from '../../shared/rental.model';

import { BookingService } from '../../../booking/shared/booking.service';
import { NewUserService } from '../../../common/services/new-user.service';
import { ToastrService } from 'ngx-toastr';

import * as moment from 'moment';


@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent) picker: DaterangePickerComponent;

  newBooking: Booking;
  modelRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  options: any = {
      locale: { format: Booking.DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDates.bind(this)
  };



  selectedDate(value: any, datepicker?: any) {
      this.options.autoUpdateInput = true;
      this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
      this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
      this.newBooking.days = -(value.start.diff(value.end, 'days'));
      this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
  }

  constructor(private helperService: HelperService,
              private bookingService: BookingService,
              private newUserService: NewUserService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.newBooking = new Booking();
    this.getBookedOutDates();
  }

  private checkForInvalidDates(date) {
    return this.bookedOutDates.includes(this.helperService.formatBookingDate(date))
           || date.diff(moment(), 'days') <  0;
  }

  private getBookedOutDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
        bookings.forEach((booking: Booking) => {
        const dateRange = this.helperService.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
      });
    }
  }

  private addNewBookingDates(bookingData: any) {
    const startAt = moment(bookingData.startAt).toISOString();
    const endAt = moment(bookingData.endAt).toISOString();
    const dateRange = this.helperService.getBookingRangeOfDates(startAt, endAt);
    this.bookedOutDates.push(...dateRange);
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content) {
    this.open(content);
  }

  open(content) {
    this.errors = [];
    this.modelRef = this.modalService.open(content);
  }

  createBooking() {
    this.newBooking.id = '3'; // TODO: static counter property
    this.newBooking.createdAt = new Date().toISOString();
    this.newBooking.userId = this.newUserService.getnewUsersId();
    this.rental.bookings.push(this.newBooking);
    this.bookingService.addBooking(this.rental).subscribe((rental) => {
      this.addNewBookingDates(this.newBooking);
      this.newBooking = new Booking();
      this.modelRef.close();
      this.resetDatePicker();
      this.toastr.success('Booking has been successfully created, check your booking detail in manage section', 'Success!');
    },
    (errorResponse) => {
      this.errors = errorResponse.error.errors;
    });
  }

}
