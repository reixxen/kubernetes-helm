import "./App.css";
import {
  Uploader,
  InputNumber,
  Panel,
  SelectPicker,
  CustomProvider,
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useState } from "react";

export enum ImageType {
  Png = "png",
  Jpg = "jpg",
  Webp = "webp",
}

export const format = [
  { label: "png", value: ImageType.Png },
  { label: "jpg", value: ImageType.Jpg },
  { label: "webp", value: ImageType.Webp },
];

function App() {
  const [payload, setPayload] = useState({
    width: 200,
    height: 200,
    quality: 100,
    type: ImageType.Webp,
  });
  const [result, setResult] = useState<string>();
  console.log(import.meta.env.VITE_DOMAIN);

  const uploadedFile = (response: object) => {
    const file = response as { url: string };
    setResult(file.url);
  };

  return (
    <CustomProvider theme="dark">
      <div className="app">
        <img src="/vite.svg" alt="logo" />

        <Panel className="panel" bordered>
          <h1 className="header">Конвертер изображений</h1>
          <div className="options">
            <div>
              <label>Ширина</label>
              <InputNumber
                value={payload.width}
                min={0}
                size="md"
                onChange={(e) =>
                  setPayload((m) => ({ ...m, width: Number(e) }))
                }
              />
            </div>
            <div>
              <label>Высота</label>
              <InputNumber
                value={payload.height}
                min={0}
                size="md"
                onChange={(e) =>
                  setPayload((m) => ({ ...m, height: Number(e) }))
                }
              />
            </div>
            <div>
              <label>Качество</label>
              <InputNumber
                value={payload.quality}
                min={0}
                max={100}
                step={0.1}
                size="md"
                onChange={(e) =>
                  setPayload((m) => ({ ...m, quality: Number(e) }))
                }
              />
            </div>
            <div>
              <label>Формат</label>
              <SelectPicker
                style={{ width: "100%" }}
                data={format}
                value={payload.type}
                onChange={(e) =>
                  setPayload(
                    (m) =>
                      ({ ...m, type: e }) as {
                        type: ImageType;
                        width: number;
                        height: number;
                        quality: number;
                      },
                  )
                }
              />
            </div>
          </div>

          <Uploader
            draggable
            fileListVisible={false}
            multiple={false}
            action={`${import.meta.env.VITE_DOMAIN}/api/upload?width=${
              payload.width
            }&height=${payload.height}&quality=${payload.quality}&type=${
              payload.type
            }`}
            onSuccess={uploadedFile}
          >
            <button style={{ width: "100%", marginTop: 10, height: 200 }}>
              Загрузить
            </button>
          </Uploader>
          {result && (
            <>
              <br />
              <br />
              <h2 className="header">Результат</h2>
              <img
                className="result"
                src={import.meta.env.VITE_DOMAIN + result}
                alt="результат"
              />
            </>
          )}
        </Panel>
      </div>
    </CustomProvider>
  );
}

export default App;
