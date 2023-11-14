import React from 'react'
import { Form, Input, Button } from 'antd'
/**
 * 设计一个表单需求
 * 
 * 填写用户的信息。然后是用户的名称，用户的名称里还有用户的xin，名
 */

export default () => {
    const [form] = Form.useForm()
    console.log(form)

    return (
        <Form form={form}>
            <h2>用户信息</h2>
            <Form.Item label="用户姓" name={["userInfo", 'name', 'firstName']}>
                <Input />
            </Form.Item>
            <Form.Item label="用户名" name={["userInfo", 'name', 'secondName']}>
                <Input />
            </Form.Item>

            <Button onClick={() => {
                console.log(form.getFieldsValue())
            }}> 提交数据</Button>

            <Form.Item label="姓名" name={["userInfo", 'name', 'fullName']}>
                <Input />
            </Form.Item>

            <Button onClick={() => {
                const { userInfo } = form.getFieldsValue()
                const { fullName } = userInfo.name
                const [firstName, secondName] = fullName.split(' ')
                /**
                 * antd5 已经不能浅合并了
                 */
                // form.setFieldsValue({
                //     userInfo: {
                //         name: {
                //             firstName,
                //             secondName
                //         }
                //     }
                // })
                form.setFieldValue(["userInfo", 'name', 'firstName'], firstName)
                form.setFieldValue(["userInfo", 'name', 'secondName'], secondName)
                // 异步加载Model
            }}> 同步姓和名</Button>

        </Form>
    )
}