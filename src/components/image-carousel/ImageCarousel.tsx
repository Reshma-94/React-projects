import React, { useEffect, useRef, useState } from "react";
import { DataType } from "../pagination/ImageContainer";

export default function ImageCarousel() {
  const [data, setData] = useState<DataType[]>([]);
  const [index, setIndex] = useState<number>(0);
  const ref = useRef<number | undefined | NodeJS.Timeout>(undefined);
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(`https://picsum.photos/v2/list`);
      const resultData = await result.json();
      if (resultData) {
        setData(resultData);
      }
    };
    getData();
  }, []);

  const handlePrev = () => {
    if (index > 0) setIndex(index - 1);
    else setIndex(data.length - 1);
  };

  const handleNext = () => {
    setIndex((prevIndex) => {
      if (prevIndex === data.length - 1) return 0;
      else return prevIndex + 1;
    });
  };

  useEffect(() => {
    ref.current = setInterval(handleNext, 1000);
    return () => {
      clearInterval(ref.current);
    };
  }, []);

  return (
    <div
      className="carousel-container"
      onMouseEnter={() => clearInterval(ref.current)}
      onMouseLeave={() => (ref.current = setInterval(handleNext, 1000))}
    >
      <div className="prev-btn" onClick={handlePrev}>
        {"<"}
      </div>
      {data?.length > 0 && (
        <img src={data[index]?.download_url} alt={data[index].author} />
      )}
      <div className="next-btn" onClick={handleNext}>
        {">"}
      </div>
    </div>
  );
}
