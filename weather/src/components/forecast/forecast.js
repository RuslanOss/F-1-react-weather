import "./forecast.css";
import {
  Accordion,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItem,
  AccordionItemButton,
} from "react-accessible-accordion";

const Forecast = ({ data }) => {
  return (
    <>
      <span className="title">Forecast</span>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 40).map((item, index) => (
          <AccordionItem key={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="hourly-item">
                  <img
                    alt="weather"
                    className="icon-small"
                    src={`icons/${item.weather[0].icon}.png`}
                  />
                  <span className="date">
                    {new Date(item.dt * 1000).toLocaleString("en", {
                      weekday: "long",
                    })}{" "}
                    {item.dt_txt.slice(-8, -3)}
                  </span>
                  <span className="temp">{Math.round(item.main.temp)}°C</span>
                  <span className="description">
                    {item.weather[0].description}
                  </span>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="details-grid">
                <div className="details-grid-item">
                  <span>Pressure</span>
                  <span>{item.main.pressure}hPa</span>
                </div>
                <div className="details-grid-item">
                  <span>Humidity</span>
                  <span>{item.main.humidity}%</span>
                </div>
                <div className="details-grid-item">
                  <span>Wind speed</span>
                  <span>{item.wind.speed}m/s</span>
                </div>
                <div className="details-grid-item">
                  <span>Feels like</span>
                  <span>{Math.round(item.main.feels_like)}°C</span>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;