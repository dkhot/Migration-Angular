import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'my-greate-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-greate-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('my-greate-app');
  });

  it('updates the view on a native click event under zoneless change detection', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    compiled.querySelector('button')?.dispatchEvent(new Event('click'));
    await fixture.whenStable();

    expect(compiled.querySelector('h1')?.textContent).toContain('my-greate-app!');
  });

  it('updates the view on an ngModel-bound input event under zoneless change detection', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const modelInput = compiled.querySelectorAll('input')[1] as HTMLInputElement;
    modelInput.value = 'updated-title';
    modelInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();

    expect(fixture.componentInstance.title).toEqual('updated-title');
    expect(compiled.querySelector('h1')?.textContent).toContain('updated-title');
  });
});
