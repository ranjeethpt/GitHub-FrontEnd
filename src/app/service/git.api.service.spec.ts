/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GitApiService } from './git.api.service';
import { PullResponse } from '../model/PullResponse';
import { HttpRequest } from '@angular/common/http';


describe('GitApiService', () => {
    let pullResponse: PullResponse[];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GitApiService]
        });
        pullResponse = [];
        pullResponse.push(new PullResponse(1, 2, 'Open', 'Guardians of Galaxy', 'Save the Galaxy.'))
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it('should return the Observable with success message and should convert the json data to PullResponse model',
        async(inject([GitApiService, HttpTestingController],
            (service: GitApiService, backend: HttpTestingController) => {

                let pullResponseResult: PullResponse[] = [];

                service.getAllPullRequest('Groot', 'Guardians-Of-Galaxy').subscribe(
                    (response) => {
                        pullResponseResult = response;
                    });

                let httpRequest = backend.expectOne((apiHttpRequest: HttpRequest<any>) => {
                    return apiHttpRequest.method === 'GET'
                        && apiHttpRequest.url === 'https://api.github.com/repos/Groot/Guardians-Of-Galaxy/pulls'
                        && apiHttpRequest.headers.get('Content-Type') === 'application/json'
                });
                httpRequest.flush(pullResponse);
                expect(pullResponseResult).toEqual(pullResponse);
            }))
    );


    it(`should handle error when the response is not success`,
        async(inject([GitApiService, HttpTestingController],
            (service: GitApiService, backend: HttpTestingController) => {
                type ResponseOrError = PullResponse[] | string | null;
                let errorResponse: ResponseOrError = null;

                service.getAllPullRequest('Thanos', 'Guardians-Of-Galaxy').subscribe(
                    (response) => {
                        errorResponse = response;
                    });

                let httpRequest = backend.expectOne((apiHttpRequest: HttpRequest<any>) => {
                    return apiHttpRequest.method === 'GET'
                        && apiHttpRequest.url === 'https://api.github.com/repos/Thanos/Guardians-Of-Galaxy/pulls'
                        && apiHttpRequest.headers.get('Content-Type') === 'application/json'
                });

                httpRequest.flush(null, {status: 400, statusText: 'You are not a Guardian.!!!'});
                expect<ResponseOrError>(errorResponse).toEqual('You are not a Guardian.!!!');
            }))
    );

});
