/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

export class MergeResponse {
    constructor(public sha: string, public merged: boolean, public message: string) {
    }
}
