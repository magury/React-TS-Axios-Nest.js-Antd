declare namespace format {
    type Result<T> = {
        statusCode: number,
        message: string,
        result: T
    }
    type  Login = {
        avatarPath: string,
        hospitalId: string,
        depart: string,
        hospitalName: string,
        hospitalLevel: string,
        province: string,
        position: string,
        userId: string
    }
    type Register = {
        station: boolean
    }
    type Admin = {
        station: boolean
    }
}