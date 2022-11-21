import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueNftComponent } from './issue-nft.component';

describe('IssueNftComponent', () => {
  let component: IssueNftComponent;
  let fixture: ComponentFixture<IssueNftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueNftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueNftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
