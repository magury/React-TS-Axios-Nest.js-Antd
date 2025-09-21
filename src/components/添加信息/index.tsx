import React, {Fragment, useRef, useState} from "react";
import {Table, Tag, Input, Popconfirm, notification, InputNumber, Button} from "antd";
import type {ColumnsType} from "antd/es/table";
import {deleteUser, http, postAdds} from "@/utility/http";
import useMessage from "antd/es/message/useMessage";
import {useLoaderData} from "react-router-dom";
import {useAppSelector} from "@/store/hooks";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {addition, Result, table} from "@/utility/new.type";
const App: React.FC = () => {
    const loader = useLoaderData() as addition.loader[];
    // 对话框
    const [api, contextHolder] = notification.useNotification();
    const [data, setData] = useState<addition.state.data[]>(loader);
    const handleDelete = async (record: addition.state.data) => {
        const newData = data.filter((item: addition.state.data) => item.uuid != record.uuid);
        setData(newData);
        const res = await deleteUser({uuid: record.uuid});
        if (res.statusCode == 200) api.open({message: "删除成功"});
    };
    /** 字段类型 */
    const columns: ColumnsType<addition.state.data> = [
        {title: "序号", dataIndex: "id", key: "id",}, {title: "患者姓名", dataIndex: "customer", key: "customer",},
        {title: "医院名称", dataIndex: "hospitalName", key: "hospitalName",}, {
            title: "科室", dataIndex: "depart", key: "depart",
        },
        {title: "创建时间", dataIndex: "createdDate", key: "createdDate",}, {
            title: "病情", key: "tags", dataIndex: "tags",
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") color = "volcano";
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}{" "}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_, record: addition.state.data) => {
                return data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => {
                            handleDelete(record);
                        }}
                    >
                        <a style={{color: "#0056b3"}}>Delete</a>
                    </Popconfirm>
                ) : null;
            },
        },
    ];
    /**
     * @description  更新字段函数
     * @param result 字段信息
     *  */
    const getList = ({result}: Result<table.patient[]>) => {
        const res: addition.state.data[] = [];
        result.map((item, index) => {
            const tags = JSON.parse(item.tags);
            res.push({
                key: item.customerId,
                id: item.customerId,
                customer: item.customer,
                hospitalName: item.hospitalName,
                depart: item.depart,
                createdDate: item.createdDate,
                tags,
                uuid: item.uuid,
            });
        });
        setData(res);
    };

    return (
        <Fragment>
            <Search getList={getList}/>
            {contextHolder}
            <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                style={{minHeight: "500px"}}
            />
        </Fragment>
    );
};

interface IProps {
    getList: Function;
}

const Search: React.FC<IProps> = (props) => {
    const [api, contextHolder] = notification.useNotification();
    const status = useAppSelector((state) => state.login.doth);
    // 对话框
    const hospital = useRef<any>(null);
    const name = useRef<any>(null);
    const main = useRef<any>(null);
    const medical = useRef<any>(null);
    const result = useRef<any>(null);
    const frequent = useRef<any>(null);
    const [times, setTimes] = useState(3);
    /**
     * @description 添加信息
     * @returns null
     */
    const query = async (): Promise<void> => {
        const params = [];
        const customerId = hospital.current.input.value.trim();
        if (customerId == "") params.push("身份证号");
        const customer = name.current.input.value.trim();
        if (customer == "") params.push("患者姓名");
        const tags = main.current.input.value.trim();
        if (tags == "") params.push("主要病情");
        const prescriptionDrug = medical.current.input.value.trim();
        if (prescriptionDrug == "") params.push("处方药");
        if (times == 0) params.push("就诊次数");
        const cause = result.current.input.value.trim();
        if (params.length > 0)
            return api.open({message: `输入错误！！${params.join("、")}不能为空`});
        const {
            hospitalId,
            depart,
            hospitalName,
            hospitalLevel,
            province,
            hospitalAddress,
        } = status;
        const data = {
            customerId,
            customer,
            tags,
            prescriptionDrug,
            cause,
            times,
            hospitalId,
            depart,
            hospitalName,
            hospitalLevel,
            province,
            hospitalAddress,
        };
        const res:Result<table.patient> = await postAdds(data);
        if (res.statusCode == 200) {
            api.open({
                message: "success",
            });
            props.getList(res);
        }
    };
    /**
     * @description 清除查询信息
     */
    const clean = (): void => {
        setTimes(0);
        // 清除查询信息
        hospital.current.input.value =
            name.current.input.value =
                main.current.input.value =
                    medical.current.input.value =
                        null;
    };
    const onChange = (value: any) => setTimes(value);
    return (
        <Fragment>
            {contextHolder}
            <Input
                defaultValue="csc0001"
                ref={hospital}
                placeholder="身份证号"
                style={{
                    width: "200px",
                    marginRight: "30px",
                }}
            />
            <Input
                defaultValue="秦膶髇"
                ref={name}
                placeholder="患者名称"
                style={{width: "100px", marginRight: "30px"}}
            />
            <Input
                defaultValue="感冒 流鼻涕，咳嗽"
                ref={main}
                placeholder="主要病情"
                style={{width: "200px", marginRight: "30px"}}
            />
            <Input
                defaultValue="我不知道啊"
                ref={medical}
                placeholder="处方药"
                style={{width: "200px", marginRight: "30px"}}
            />
            <Input
                defaultValue=""
                ref={result}
                placeholder="不良信息"
                style={{width: "200px", marginRight: "30px"}}
            />

            <div style={{marginTop: -50}}>
                <Tag color="success">输入就诊次数</Tag>
                <InputNumber
                    ref={frequent}
                    min={1}
                    max={10}
                    value={times}
                    style={{marginRight: "30px"}}
                    onChange={onChange}
                />
                ;
                <Button
                    onClick={query}
                    type="primary"
                    style={{marginRight: "30px"}}
                    icon={<SearchOutlined/>}
                >
                    添加信息
                </Button>
                <Button onClick={clean} type="dashed" icon={<CloseOutlined/>}>
                    重新输入
                </Button>
            </div>
        </Fragment>
    );
};
export default App;
