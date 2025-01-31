import { useEffect, useState } from "react";
import Pagination from "./Pagination";

export interface DataType {
  author: string;
  download_url: string;
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface PaginationType {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function ImageContainer() {
  const [data, setData] = useState<DataType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(
        `https://picsum.photos/v2/list?page=${pageNumber}&limit=5`
      );
      const resultData = await result.json();
      if (resultData) {
        setData(resultData);
      }
    };
    getData();
  }, [pageNumber]);
  return (
    <div className="container">
      <div className="image-container">
        {data.map((item) => {
          return (
            <img key={item.id} src={item.download_url} alt={item.author} />
          );
        })}
      </div>
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
    </div>
  );
}
