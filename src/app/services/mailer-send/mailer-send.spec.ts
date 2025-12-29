import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MailerSend } from './mailer-send';
import { environment } from '../../../environments/environment';

describe('MailerSend', () => {
  let service: MailerSend;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MailerSend]
    });

    service = TestBed.inject(MailerSend);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send contact email', () => {
    const mockResponse = { message_id: 'test-123' };
    const testData = {
      nombre: 'Test User',
      email: 'test@example.com',
      asunto: 'Test Subject',
      mensaje: 'Test Message'
    };

    service.sendContactEmail(testData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.mailerSend.apiUrl}/email`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toContain('Bearer');
    
    req.flush(mockResponse);
  });
});
