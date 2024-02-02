import React, {Fragment, useEffect, useState} from "react";
import {Space, Table, Tag, Input, Popconfirm, notification, UploadProps, Upload, Button} from "antd";
import type {ColumnsType} from "antd/es/table";
import {deleteReport} from "@/utility/http";
import useMessage from "antd/es/message/useMessage";
import {useLoaderData} from "react-router-dom";
import {useAppSelector} from "@/store/hooks";
import {CloseOutlined, UploadOutlined} from "@ant-design/icons";
import {upload} from "@/utility/new.type";

const App: React.FC = () => {
const loader= useLoaderData() as upload.loader[]
    const [api, contextHolder] = notification.useNotification();
    const getList = (list: any[]) => {
        list.map((item,index) => {
            item.key = index+''
        })
        setData(list)
    }
    const [data, setData] = useState<Array<upload.data>>(loader);
    const handleDelete = async (uuid: string) => {
        const newData = data.filter((item) => item.uuid !== uuid);
        const result = await deleteReport(uuid)
        api.open({message: '删除成功'})
        setData(newData);
    };
    const columns: ColumnsType<upload.data> = [
        {
            title: "患者id",
            dataIndex: "customerId",
            key: "customerId",
        },
        {
            title: "患者姓名",
            dataIndex: "customer",
            key: "customer",
        },
        {
            title: "医院名称",
            dataIndex: "hospitalName",
            key: "hospitalName",
        },
        {
            title: "科室",
            dataIndex: "depart",
            key: "depart",
        },
        {
            title: "创建时间",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "检查类别",
            key: "tags",
            dataIndex: "tags",
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "operation",
            dataIndex: "operation",
            render: (_, record: upload.data) => {
                return data.length >= 1 ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => {
                            handleDelete(record.uuid);
                        }}
                    >
                        <a style={{color: "#0056b3"}}>Delete</a>
                    </Popconfirm>
                ) : null;
            },
        },
    ];
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
    getList: Function
}
const Search: React.FC<IProps> = (props) => {
    const status = useAppSelector(state => state.login.doth)
    // 对话框
    const [messageApi, contextHolder] = useMessage()
    const [customerId, setCustomerId] = useState('csc0001');
    const [tags, setTags] = useState('感冒、流鼻涕')
    const [show, setShow] = useState(true)
    const [customer, setCustomer] = useState('秦膶髇')
    useEffect(() => {
        if ( customerId == '' || tags == '' || customer == '')
            setShow(false)
        else
            setShow(true)
    }, [ customerId, tags, customer])

    const prop: UploadProps = {
        accept: 'image/*',
        openFileDialogOnClick: show,
        showUploadList: false,
        name: 'file',
        action: `http://localhost:3011/upload/report`,
        headers: {
            authorization: 'authorization-text',
        },
        data: {
            customerId:customerId, hospitalName: status.hospitalName, depart: status.depart, createdDate: new Date().toLocaleString(),
            tags, customer,uuid:''
        },
        onChange(info) {
            if (info.file.status == 'uploading') {
                messageApi.loading(`${info.file.name} file uploading`)
            }
            if (info.file.status === 'done') {
                messageApi.success(`${info.file.name} file uploaded successfully`);
                props.getList(info.file.response.result)

            } else if (info.file.status === 'error') {
                messageApi.error(`${info.file.name} file upload failed.`);
            }
        }

    };
    const onChange = async (e: any) => {
        const { id, value } = e.target
        switch (id) {
            case 'customerId':
                setCustomerId(value)
                break;
            case 'tags':
                setTags(value)
            case 'customer':
                setCustomer(value)
                break;
        }
    }
    const clean = (): void => {
        // 清除查询信息
        setCustomerId('')
        setTags('')
    };
    const onClick = () => {
        const params = []
        if (customerId.trim() == '')
            params.push('身份证号')
        if (tags.trim() == '')
            params.push('检查内容')
        if (customer.trim() == '')
            params.push('患者姓名')
        if (params.length > 0)
            messageApi.open({
                type: 'error',
                content: `${params.join('、')} 信息不完整,上传失败！`
            })


    }
    return (
        <Fragment>
            {contextHolder}
            <div
                style={{
                    width: "600px",
                    margin: "0px auto",
                    marginTop: "-20px",
                }}
            >
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 50, marginBottom: 30, justifyContent: 'center' }}>
                <Input
                    id="customer"
                    onChange={onChange}
                    defaultValue={'秦膶髇'}
                    placeholder="患者姓名"
                    style={{ width: "100px", marginRight: "30px" }}
                />
                <Input
                    id="customerId"
                    onChange={onChange}
                    defaultValue={'csc0001'}
                    placeholder="身份证号"
                    style={{ width: "100px", marginRight: "30px" }}
                />
                <Input
                    id="tags"
                    onChange={onChange}
                    defaultValue={'感冒,流鼻涕'}
                    placeholder="检查内容"
                    style={{ width: "200px", marginRight: "30px" }}
                />
                <div className="upload">
                    <Upload {...prop} >
                        <Button onClick={onClick} icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                    <Button style={{ marginLeft: '30px' }} onClick={clean} type="dashed" icon={<CloseOutlined />}>
                        重新输入
                    </Button>
                </div>

            </div>

        </Fragment>
    );
};
export default App;
