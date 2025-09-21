import React, {Fragment, useRef, useState} from "react";
import {Table, Tag, Input, DatePicker, Drawer, Space, ConfigProvider, Button, notification} from "antd";
import type {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {getReport} from "@/utility/http";
import locale from "antd/locale/zh_CN";
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";
import {analyse, table} from "@/utility/new.type";

const {RangePicker} = DatePicker;
const App: React.FC = () => {
    const [api, contextHolder] = notification.useNotification();
    const img = useRef<any>(null)
    // 框
    const [open, setOpen] = useState(false);
    // 显示抽屉
    const showDrawer = (path: string) => {
        img.current.src = path
        setOpen(true);
    };
    // 关闭抽屉
    const onClose = () => {
        setOpen(false);
    };
    const [data, setData] = useState<analyse.data[]>([]);
    const columns: ColumnsType<analyse.data> = [
        {
            title: "患者姓名",
            dataIndex: "customer",
        },
        {
            title: "医院名称",
            dataIndex: "hospitalName",
        },
        {
            title: "科室",
            dataIndex: "depart",
        },
        {
            title: "创建时间",
            dataIndex: "createdDate",
            key: "createdDate",
        },
        {
            title: "检查类别",
            dataIndex: "tags",
            render: (_, {tags}) => (
                <Fragment>
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
                </Fragment>
            ),
        },
        {
            title: "operation",
            dataIndex: "reportPath",
            render: (_, record: analyse.data) => {
                return data.length >= 1 ? (
                    <a className="a_color" onClick={() => showDrawer(record.reportPath)}>
                        查看文件
                    </a>
                ) : null;
            },
        },
    ];

    const getList = (result: (table.report | any)[]) => {
        result.map((item, index) => {
            item.key = index + ''
        })
        if(result.length==0)
            api.open({message:'未搜索到此人信息'})
        setData(result)
    }
    return (
        <Fragment>
            {contextHolder}
            <Search getList={getList}/>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data}
                style={{minHeight: "500px"}}
            />
            <Drawer forceRender={true} width='fit-content' title="报告信息" placement="right" onClose={onClose}
                    open={open}>
                <img ref={img} src="" alt=""/>
            </Drawer>
        </Fragment>
    );
};

interface IProps {
    getList: Function
}

const Search: React.FC<IProps> = (props) => {
    /** 日期动态初值 */
    const [dataRange, setDataRange] = useState<any>([dayjs("2014-01-15", "YYYY-MM-DD"), dayjs("2034-01-16", "YYYY-MM-DD")])
    const customerId = useRef<any>(null);
    const customer = useRef<any>(null);
    const query = async (): Promise<void> => {
        const params = {
            customerId: customerId.current.input.value,
            customer: customer.current.input.value,
            range: [new Date(dataRange[0]['$d']).toLocaleString(), new Date(dataRange[1]['$d']).toLocaleString()]
        }
        const res = await getReport(params)
        props.getList(res.result)

    };
    const clean = (): void => {
        // 清除查询信息
        customer.current.input.value = customerId.current.input.value = null;

    };
    const onChange = (dates: any, dateStrings: [string, string]) => {
        setDataRange([
            dayjs(dateStrings[0], "YYYY-MM-DD"), dayjs(dateStrings[1], "YYYY-MM-DD")
        ])
    }

    return (
        <Fragment>
            <Input
                defaultValue={'1705331781542.4788'}
                ref={customerId}
                placeholder="身份证号"
                style={{width: "200px", marginRight: "30px"}}
            />
            <Input
                defaultValue={'秦膶髇'}
                ref={customer}
                placeholder="姓名"
                style={{width: "100px", marginRight: "30px"}}
            />
            <Space direction="vertical" size={12} style={{marginRight: "30px"}}>
                <ConfigProvider locale={locale}>
                    <RangePicker
                        onChange={onChange}
                        allowEmpty={[false, false]}
                        allowClear={false}
                        value={dataRange}
                        defaultValue={dataRange}
                    />
                </ConfigProvider>
            </Space>
            <Button
                onClick={query}
                type="primary"
                style={{marginRight: "30px"}}
                icon={<SearchOutlined/>}
            >
                查询数据
            </Button>
            <Button onClick={clean} type="dashed" icon={<CloseOutlined/>}>
                重新输入
            </Button>
        </Fragment>
    );
};
export default App;
