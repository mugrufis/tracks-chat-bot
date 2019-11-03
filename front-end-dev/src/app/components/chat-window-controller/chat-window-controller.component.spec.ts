import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowControllerComponent } from './chat-window-controller.component';

describe('ChatWindowControllerComponent', () => {
  let component: ChatWindowControllerComponent;
  let fixture: ComponentFixture<ChatWindowControllerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
