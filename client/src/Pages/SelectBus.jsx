import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../Styles/selectbus.module.css";
import axios from "axios";
import { AiTwotoneStar } from "react-icons/ai";
import { BiArrowFromLeft } from "react-icons/bi";
import { saveDatafilter } from "../Redux/filter/filter.action";
import { removeall } from "../Redux/ticket/ticket.action";
import Filters from "../Components/Seats/Filters";
import { useDispatch, useSelector } from "react-redux";
import { error } from "../Utils/notification";

function SelectBus() {
  const [wentwrong, setwentwrong] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const dataredux = useSelector((state) => state.filter.data);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(removeall());
  }, []);

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");
    if (!from || !to || !date) {
      setwentwrong(true);
    } else {
      getdata(from, to, date);
    }
  }, []);

  useEffect(() => {
    // Apply filters whenever filter data or bus data changes
    applyFilters();
  }, [dataredux]);

  async function getdata(from, to, date) {
    try {
      const res = await axios.post("https://swamitravels-bbxl.onrender.com/bus/getall", {
        from,
        to,
        date,
      });
      if (res.data.length === 0) {
        error("Cities Not Found. Try with other routes");
        return navigate("/");
      }
      dispatch(saveDatafilter(res.data));
      setwentwrong(false);
    } catch (error) {
      console.log(error.message);
      setwentwrong(true);
    }
  }

  function applyFilters() {
    if (!dataredux) return;
    // Apply filters based on filter data
    const filteredBuses = dataredux.filter((bus) => {
      // Example filter logic: check if bus type matches selected filters
      return (
        (!bus.SEATER || bus.aminites.includes("SEATER")) &&
        (!bus.SLEEPER || bus.aminites.includes("SLEEPER")) &&
        (!bus.AC || bus.aminites.includes("AC")) &&
        (!bus.NONAC || bus.aminites.includes("NONAC"))
      );
    });
    setFilteredData(filteredBuses);
  }

  async function handlebook(ele) {
    navigate({
      pathname: `/bookticket/${ele._id}`,
      search: `?&date=${searchParams.get("date")}`,
    });
  }

  return (
    <>
      {wentwrong ? (
        <div className={styles.wrong}>
         <h1 style={{color:"red",textAlign:"center"}}> 404 Error</h1>
        </div>
      ) : (
        <div className={styles.main}>
          <div className={styles.filter}>
            <h5
              style={{
                textAlign: "left",
                marginLeft: "25px",
              }}
            >
              FILTERS
            </h5>
            <hr />
            <Filters />
            <hr />
          </div>
          <div className={styles.busdata}>
            {filteredData.map((ele, i) => {
              return (
                <div key={i}>
                  <h5>
                    {ele.companyname.charAt(0).toUpperCase() +
                      ele.companyname.slice(1)}{" "}
                    Travels
                  </h5>
                  <div>
                    {" "}
                    <p>{ele.from}</p>
                    <p>
                      <BiArrowFromLeft />
                    </p>
                    <p>{ele.to}</p>
                  </div>{" "}
                  <div>
                    {" "}
                    {ele.aminites.map((e, i) => (
                      <div key={i}>
                        {" "}
                        <p>{e}</p>
                      </div>
                    ))}
                  </div>
                  <hr />
                  <h6>Arrival Time : {ele.arrival}</h6>
                  <h6>Departure Time : {ele.departure}</h6>
                  <h6>Aminites : {ele.aminites}</h6>
                  <hr />
                  <h6>Email : {ele.email}</h6>
                  <h6>Phone : {ele.phone}</h6>
                  <hr />
                  <div>
                    {" "}
                    <h5>Price : ₹ {ele.price}</h5>
                    <h5>
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <AiTwotoneStar
                            key={i}
                            color={i < ele.rating ? "#FFED00" : "gray"}
                          />
                        ))}
                    </h5>
                  </div>
                  <button onClick={() => handlebook(ele)}>View Seats</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default SelectBus;
