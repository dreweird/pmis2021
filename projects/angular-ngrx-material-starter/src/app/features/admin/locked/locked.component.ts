import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { PmisService } from '../../../core/services/pmis.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormGroupDirective
} from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

@Component({
  selector: 'anms-locked',
  templateUrl: './locked.component.html',
  styleUrls: ['./locked.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LockedComponent implements OnInit {
  locked: any;
  checked: any;
  inputForm: FormGroup;
  announced: any;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  getStatus(isStatus) {
    return isStatus ? 'Opened' : 'Closed';
  }
  getReverseStatus(isStatus) {
    return !isStatus ? 'Opened' : 'Closed';
  }

  onPost(formDirective: FormGroupDirective) {
    this.pmisService
      .postAnnouncement(this.inputForm.value.text, 1)
      .subscribe(data => {
        if (!data) {
          alert('something went wrong');
        }
        this.getAnnouncement();
      });
    formDirective.resetForm();
    this.inputForm.reset();
  }

  getAnnouncement() {
    this.pmisService.getAnnouncement().subscribe(data => {
      this.announced = data;
      this.cd.markForCheck();
    });
  }

  getLocked() {
    this.pmisService.month_locked().subscribe(data => {
      this.locked = data;
      this.cd.markForCheck();
    });
  }

  constructor(private pmisService: PmisService, private cd: ChangeDetectorRef) {
    this.inputForm = new FormGroup({
      text: new FormControl('', [Validators.required])
    });
  }

  toggle(event: any, l) {
    let status = this.getReverseStatus(l.checked);
    let proceed = confirm(
      `Are you sure you want to ${status} the month of ${l.month}?`
    );
    if (proceed) {
      if (status == 'Opened') {
        this.checked = true;
      } else {
        this.checked = false;
      }
      this.pmisService.updateLocked(this.checked, l.id).subscribe(data => {
        if (!data) {
          alert('something wrong happen!');
        }
      });
    } else {
      event.preventDefault();
    }
  }

  toggle2(event: any, l) {
    let status = this.getReverseStatus(l.checked);
    let proceed = confirm(`Are you sure you want to post the announcement?`);
    if (proceed) {
      if (status == 'Opened') {
        this.checked = true;
      } else {
        this.checked = false;
      }
      this.pmisService
        .updateAnnouncement(this.checked, l.id)
        .subscribe(data => {
          if (!data) {
            alert('something wrong happen!');
          }
        });
    } else {
      event.preventDefault();
    }
  }

  ngOnInit(): void {
    this.getAnnouncement();
    this.getLocked();
  }
}
