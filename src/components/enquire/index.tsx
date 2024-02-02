import React, { ChangeEvent, Fragment, useEffect, useRef, useState } from "react";
import TextArea from "antd/es/input/TextArea";
// 引入编辑器组件
import BraftEditor, { ExtendControlType } from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'
import { Button, Card, Flex, Form } from "antd";
import { fetchPutInquireImg, postTalking, putInquireImg } from "@/utility/http";
import useMessage from "antd/es/message/useMessage";

const App: React.FC = () => {
  const [taValue, setValue] = useState<any>('')
  const ta = useRef<any>(null)
  const [count, setCount] = useState<number>(0)
  const [messageApi, contextHolder] = useMessage()
  const [editorState, setEditorState] = useState<any>(BraftEditor.createEditorState(null))
  const handleEditorChange = (editorState: any) => {
    setCount(editorState.toText().length)
    setEditorState(editorState)
  }
  /** window操作*/
  const buildPreviewHtml = () => {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `

  }
  const submitContent = async () => {
    const { current: { resizableTextArea: { textArea: { value: title } } } } = ta
    const htmlContent = editorState.toHTML()
    if (title == '' || htmlContent == '' || count == 0)
      messageApi.error('输入不符合规范，请完善！', 5)
    else {
      //     上传至文件
      const data = { title, htmlContent }
      const res = await postTalking(data)
      if (res.statusCode == 200) {
        setEditorState(BraftEditor.createEditorState(null))
        setValue('')
        messageApi.success('更新成功！')
      }
    }
  }
  const change = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  const progress = async (param: any) => {
    const res = await putInquireImg(param)
    // const res = await putInquireImg(param)

    //  await fetchPutInquireImg(param)
  }
  const validate = async (file: any) => {
    const { type } = file
    const pass = type.startsWith('image')
    if (!pass) {
      messageApi.error('只能输入图片噢', 5)
    }
    return pass
  }
  /** 预览功能 */
  const preview = () => {
    // @ts-ignore
    if (window["previewWindow"]) {
      // @ts-ignore
      window.previewWindow.close()
    }
    // @ts-ignore
    window.previewWindow = window.open()
    // @ts-ignore
    window.previewWindow.document.write(buildPreviewHtml())
    // @ts-ignore
    window.previewWindow.document.close()

  }
  /*功能已完善*/
  const extendControls: ExtendControlType[] = [
    {
      key: 'custom-button',
      type: 'button',
      text: '预览',
      onClick: preview
    }
  ]

  return <Fragment>
    {contextHolder}
    <TextArea maxLength={100} onChange={change} value={taValue}
      ref={ta}
      className={'text-gray-600 f-0 leading-10 w-[80%] mt-6 text-2xl border-t-0 border-l-0 rounded-none border-r-0  border-b-purple-300 break-all'}
      placeholder="请输入不超过100字的标题" autoSize />
    <div style={{ margin: '24px 0' }} />
    {/*  following  rich text*/}
    <div className="my-component w-[80%] m-auto	text-gray-600">
      <BraftEditor
        extendControls={extendControls}
        className={'mb-[100px] '}
        placeholder={'请输入正文描述信息'}
        contentStyle={{
          borderBottom: '1px solid  rgb(216 180 254)',
          height: 'fit-content',
          minHeight: '300px'
        }}

        media={{ uploadFn: progress, validateFn: validate }}
        value={editorState}
        onChange={handleEditorChange}
        onSave={submitContent}
      />
    </div>
    <Card className={'w-[100%] fixed bottom-0 z-10'}>
      <Flex>
        <span className={'w-[13%] text-gray-400'}>字数：{count}</span>
        <div className={'w-[33%]'}><Button disabled={count == 0} className={'float-right'} type="primary"
          onClick={preview}>预览</Button></div>
        <div className={'w-[10%]'}><Button disabled={count == 0} className={'float-right'} type="primary"
          onClick={() => {
            setValue('')
            setEditorState(BraftEditor.createEditorState(null))
          }}>重新输入</Button></div>

        <div className={'w-[10%]'}><Button disabled={count == 0} className={'float-right'} type="primary"
          onClick={submitContent}>提交更新</Button></div>
      </Flex>
    </Card>
  </Fragment>
}
export default App