
export class User {

    public readonly identityId: string;

    public id?: string;
    public name: string;
    public email: string;
    public password: string;

    constructor(props: User) {
        Object.assign(this, props);

    }
}
