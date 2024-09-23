import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, message, Select, Upload } from "antd";
import { useState } from "react";
import { createRunProject } from "../../../lib/api/runProjectApi";
import { createAllRunTimeSeries } from "../../../lib/api/runTimeSeriesApi";
import { parseCsv } from "./utils";

type FieldType = {
  file?: string;
  // pump1?: string;
  // pump2?: string;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const DataUploadForm = () => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onFinish = async () => {
    setDisabled(true);

    /* parse Csv */
    try {
      const file = form.getFieldValue("file")[0].originFileObj;
      let csvObj = await parseCsv(
        file,
      );

      /* replace below with actual uploading to db */
      if (csvObj) {
        const req1 = await createRunProject(csvObj.runProject);
        const req2 = await createAllRunTimeSeries(csvObj.runTimeSeries);

        if (req1.statusCode !== 200 && req2.statusCode !== 200) {
          throw new Error("Error uploading to database");
        }
      } else {
        throw new Error("Error parsing csv file");
      }

      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <>
      <Form
        data-test="data-upload-form"
        form={form}
        labelCol={{ span: 4 }}
        // wrapperCol={{ }}
        layout="horizontal"
        disabled={disabled}
        style={{ maxWidth: "80%", width: "100%" }}
        onFinish={onFinish}
      >
        <Form.Item label="Csv file" required>
          <Form.Item<FieldType>
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[
              {
                required: true,
                message: "Please upload a .csv file. limit: 1",
                max: 1,
                type: "array",
              },
            ]}
          >
            <Upload.Dragger
              name="files"
              action="/upload.do"
              beforeUpload={(file) => {
                const isCsv = file.type === "text/csv";
                if (!isCsv) {
                  message.error("You can only upload CSV files!");
                }
                return isCsv ? false : Upload.LIST_IGNORE;
              }}
              maxCount={1}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="file-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="file-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>

        {/* <Form.Item<FieldType>
          label="Pump 1:"
          name="pump1"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="glucose">Glucose</Select.Option>
            <Select.Option value="glycerol">Glycerol</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="Pump 2:"
          name="pump2"
          rules={[{ required: true }]}
        >
          <Select>
            <Select.Option value="base">Base</Select.Option>
            <Select.Option value="acid">Acid</Select.Option>
          </Select>
        </Form.Item> */}

        <div
          style={{
            textAlign: "right",
          }}
        >
          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              {disabled ? "Uploading..." : "Upload"}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default DataUploadForm;
