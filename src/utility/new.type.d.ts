import {types} from "sass";

declare namespace login {
    type loader = {
        hospitalName: string;
        hospitalId: string;
    }[];
    type provinces = { label: string; value: string }[];
    type finish = {
        username: string | undefined;
        password: string | undefined;
        hospital: {
            disabled: undefined | null | false | true;
            key: string | undefined;
            label: string | undefined;
            title: string | undefined;
            value: string | undefined;
        };
    };
}
declare namespace addition {
    type loader = {
        key: string;
        id: string;
        customer: string;
        hospitalName: string;
        depart: string;
        createdDate: string;
        tags: Array<string>;
        uuid: string;
    };
    namespace state {
        type data = loader
    }
}
declare type Result<T> = {
    statusCode: number
    result: T
}
declare namespace table {
    type patient = {
        tags: string;
        cause: string;
        customerId: string;
        depart: string;
        province: string;
        times: number;
        uuid: string;
        customer: string;
        hospitalName: string;
        hospitalLevel?: string;
        hospitalAddress?: string;
        createdDate: string;
        prescriptionDrug?: string;
    }
    type report = {
        customer: string
        hospitalName: string
        depart: string
        createdDate: string
        tags: string
        customerId: string
        reportPath: string
        uuid: string
    }
    type addition = {
        hospitalName: string;
        hospitalId: string;
        additionDate: string;
        hospitalLevel: string;
        province: string;
        position: string;
        infoJsonPath: string;
    }
}
declare namespace basic {
    type loader = table.patient & { key: string, tags: string[] }
    type data = loader
    type params = {
        hospitalName: string
        customer: string
        customerId: string
    }
}
declare namespace faulty {
    type loader = basic.loader
    type data = loader
    type params = basic.params
}
declare namespace upload {
    type loader = table.report & { key: string, tags: string[] }
    type data = loader
}
declare namespace analyse {
    type data = table.report & { key: string, tags: string[] }
}
declare namespace chat {
    type loader = {
        hospital: table.addition[]
        province: string[]
    }
    type data = table.addition
}
declare namespace popular {
    type json = {
        onlyKey: string
        avatarPath: string
        author: string
        title: string
        description: string
        descriptionPath: string
        publicDate: string
        like: number
        dislike: number
        paragraph: string[]
        comments: Array<{
            index: string
            nickname: string[]
            comment: string
            commengDate: string
        }>
    }
}
declare namespace depart {
    type   depart = {
        title: string;
        content: content[];
    }
    type content = {
        key: string;
        title: String;
        paragraph: String[];
    }
}