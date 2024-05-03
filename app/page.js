"use client";

/* use client */
import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../components/Button";
import Col from "../components/Col";
import Container from "../components/Container";
import List from "../components/List";
import Row from "../components/Row";
import Section from "../components/Section";
import Tabs from "../components/Tabs";
import Temp from "../components/Temp";
import { getGeoLocation, getWeatherDataByLatLon } from "../lib/api";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [tempUnit, setTempUnit] = useState("imperial");
  const [recommendation, setRecommendation] = useState("");

  const getRecommendations = (weather) => {
    const main = weather.main.toLowerCase();
    const temp = weather.temp;
    let recommendation = "";
  
    if (main.includes("rain")) {
      recommendation = "It's raining. Don't forget to bring an umbrella!";
    } else if (main.includes("snow")) {
      recommendation = "Snowy weather expected. Please wear warm clothing!";
    } else if (temp >= 100) {
      recommendation = "It's really hot outside. Stay cool and hydrated!";
    } else if (temp <= 32) {
      recommendation = "Freezing temperatures detected. Consider indoor activities to stay warm.";
    } else {
      recommendation = "Weather is pleasant. Perfect for outdoor activities!";
    }
  
    return recommendation;
  };

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(`Geolocation error: ${error}`);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (location) {
        const response = await getWeatherDataByLatLon(location);
        setWeatherData(response);
        setLoading(false);
        // Calculate and set recommendations
        const currentWeather = response.list[0];
        const newRecommendation = getRecommendations({
          main: currentWeather.weather[0].main,
          temp: currentWeather.main.temp
        });
        setRecommendation(newRecommendation);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    if (weatherData) {
      const tempWeek = weatherData.list.filter((block, index, self) => {
        const date = new Date(block.dt * 1000);
        return index === self.findIndex(t => new Date(t.dt * 1000).toLocaleDateString() === date.toLocaleDateString());
      }).map(block => new Date(block.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }));
      setDaysOfWeek(tempWeek);
    }
  }, [weatherData]);

  return (
    <Section>
      {errorMsg && <div>{errorMsg}</div>}
      {loading ? (
        <Container>
          <p>Loading...</p>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col sm={3} md={4}>
              <h2>{weatherData?.city?.name}</h2>
              <Temp
                size="lg"
                amount={weatherData?.list[0]?.main?.temp}
                unit={tempUnit}
              />
              <p>{weatherData?.list[0]?.weather[0]?.description}</p>
              <p>{recommendation}</p>  {/* Display the recommendation */}
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData?.list[0]?.weather[0]?.icon}@2x.png`}
                alt={`Weather icon for ${weatherData?.list[0]?.weather[0]?.description}`}
                width={100}
                height={100}
              />
              <br />
              <Button
                label={`Change to ${
                  tempUnit === "imperial" ? "celsius" : "fahrenheit"
                }`}
                clickHandler={() => {
                  setTempUnit(tempUnit === "imperial" ? "metric" : "imperial");
                }}
              />
            </Col>
            <Col sm={9} md={8}>
              {weatherData && daysOfWeek && (
                <section>
                  <Tabs
                    activeIndex={activeDayIndex}
                    items={daysOfWeek}
                    clickHandler={setActiveDayIndex}
                  />
                  <List
                    activeIndex={activeDayIndex}
                    items={weatherData.list}
                    daysOfWeek={daysOfWeek}
                    unit={tempUnit}
                  />
                </section>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </Section>
  );
};

export default Homepage;
