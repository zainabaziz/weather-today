import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Loader from "./components/Loader";
import { EnvironmentOutlined, SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const Container = styled.div`
  /* background: #101039; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  padding-top: 32px;
`;

const OuterCountainer = styled.div`
  width: 50%;
  background: #101039;
  padding: 22px;
  border-radius: 32px;
  margin-top: 92px;

  button {
    background: transparent;
    border: none;
    cursor: pointer;

    .search-icon {
      color: #fff;
      font-size: 30px;
      margin-left: 30px;
    }
  }

  input {
    background: #1a1c49;
    padding: 16px;
    width: 200px;
    border: none;
    border-radius: 12px;
    outline: none;
    color: white;
  }

  .credits {
    color: lightgray;
    text-align: center;
    margin-top: 32px;
    font-size: 11px;
  }
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 50%;
  height: 50%; */
  align-items: center;
  background: #1a1c49;
  color: white;
  border-radius: 34px;
  margin-top: 20px;
  padding: 12px;

  span {
    font-size: 20px;
    color: #a9aac1;
    /* text-align: center; */
    margin-top: 20px;
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 20%;

  p {
    font-size: 40px;

    span {
      font-size: 20px;
    }
  }
`;

const Wrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
`;

const SmallWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    font-size: 100px;
    padding: 0;
    margin: 0;

    span {
      font-size: 40px;
      color: #f3c422;
      text-align: center;
    }
  }

  h4 {
    color: #a9aac1;
    margin-top: 2px;
    padding: 0;
  }

  img {
    width: 220px;
    height: 220px;
    margin-top: 20px;
    margin-left: 50px;
  }

  p {
    margin: 0;
    font-size: 25px;
    text-align: center;
    margin-left: 30px;
    margin-bottom: 20px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EnvIcon = styled(EnvironmentOutlined)`
  color: #f3c422 !important;
`;

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const parseResponse = useCallback(
    (response) => {
      setData({
        temp: response.data.current.temp_c,
        feelLike: response.data.current.feelslike_c,
        imgUrl: response.data.current.condition.icon,
        condition: response.data.current.condition.text,
        location: response.data.location.name,
        country: response.data.location.country,
        time: response.data.location.localtime,
      });
    },
    [setData]
  );

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=6267b2b996324a5393e115509211209&q=auto:ip`
      )
      .then((response) => {
        parseResponse(response);

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [parseResponse, setLoading]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <OuterCountainer>
          <InputWrapper>
            <input
              placeholder="Country, City"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                // console.log(search)
              }}
            />

            <button
              onClick={(e) => {
                axios
                  .get(
                    `http://api.weatherapi.com/v1/current.json?key=6267b2b996324a5393e115509211209&q=${search}`
                  )
                  .then((response) => {
                    parseResponse(response);
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <SearchOutlined className="search-icon" />
            </button>
          </InputWrapper>
          <SubContainer>
            <Wrapper1>
              <p>Today</p>
              <p>
                <span>{moment(data.time).format("ddd, DD MMM")}</span>
              </p>
            </Wrapper1>

            <Wrapper2>
              <SmallWrapper>
                <h1>
                  {data.temp}
                  <span>°C</span>
                </h1>
                <h4>{data.feelLike}°C</h4>
              </SmallWrapper>
              <SmallWrapper>
                <img src={data.imgUrl} />
                <p>{data.condition}</p>
              </SmallWrapper>
            </Wrapper2>

            <span>
              <EnvIcon /> {`${data.location}, ${data.country}`}
            </span>
          </SubContainer>

          <p className='credits'>Designed & Developed by Zainab Aziz with ❤️ in Islamabad</p>
        </OuterCountainer>
      )}

    </Container>
  );
}

export default App;
