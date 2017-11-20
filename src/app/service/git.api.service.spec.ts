/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */
import { async, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GitApiService } from './git.api.service';
import { PullResponse } from '../model/PullResponse';
import { HttpRequest } from '@angular/common/http';
import { MergeResponse } from '../model/MergeResponse';


describe('GitApiService', () => {
    let pullResponse: PullResponse[];
    let mergeResponse: MergeResponse;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [GitApiService]
        });
        pullResponse = [];
        const date: Date = new Date();
        pullResponse.push(new PullResponse(1, 2, 'Open', 'Guardians of Galaxy', 'Save the Galaxy.', date, date));
        mergeResponse = new MergeResponse('All Good', true, 'I am Groot!!');
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it('should return the Observable with success message when getAllPullRequest' +
        ' is called and should convert the json data to PullResponse model',
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

    it(`should handle error when the response is not success when getAllPullRequest is called`,
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

    it('should return the Observable with success message when merge is called and should convert the json data to MergeResponse model',
        async(inject([GitApiService, HttpTestingController],
            (service: GitApiService, backend: HttpTestingController) => {

                let mergeResponseResult: any = null;

                service.merge('Groot', 'Guardians-Of-Galaxy', 124).subscribe(
                    (response) => {
                        mergeResponseResult = response;
                    });

                let httpRequest = backend.expectOne((apiHttpRequest: HttpRequest<any>) => {
                    return apiHttpRequest.method === 'PUT'
                        && Object.keys(apiHttpRequest.body).length === 0 && apiHttpRequest.body.constructor === Object
                        && apiHttpRequest.url === 'https://api.github.com/repos/Groot/Guardians-Of-Galaxy/pulls/124/merge'
                        && apiHttpRequest.headers.get('Content-Type') === 'application/json'
                });
                httpRequest.flush(mergeResponse);
                expect(mergeResponseResult).toEqual(mergeResponse);
            }))
    );


    it(`should handle error when the response is not success when merge is called`,
        async(inject([GitApiService, HttpTestingController],
            (service: GitApiService, backend: HttpTestingController) => {
                type ResponseOrError = MergeResponse | string | null;
                let errorResponse: ResponseOrError = null;

                service.merge('Thanos', 'Guardians-Of-Galaxy', 123).subscribe(
                    (response) => {
                        errorResponse = response;
                    });

                let httpRequest = backend.expectOne((apiHttpRequest: HttpRequest<any>) => {
                    return apiHttpRequest.method === 'PUT'
                        && Object.keys(apiHttpRequest.body).length === 0 && apiHttpRequest.body.constructor === Object
                        && apiHttpRequest.url === 'https://api.github.com/repos/Thanos/Guardians-Of-Galaxy/pulls/123/merge'
                        && apiHttpRequest.headers.get('Content-Type') === 'application/json'
                });

                httpRequest.flush(null, {status: 400, statusText: 'You are not allowed to join.!!!'});
                expect<ResponseOrError>(errorResponse).toEqual('You are not allowed to join.!!!');
            }))
    );

});
