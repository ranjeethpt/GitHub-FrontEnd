/**
 * Created by ranjeeth on 20/11/17.
 * @author ranjeeth
 */

export class PullResponse {
    constructor(public id: number, public number: number,
                public state: string, public title: string, public body: string,
                public created_at: Date, public updated_at: Date) {
    }
}

