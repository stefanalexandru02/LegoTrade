import React, { Component } from "react";
import authService from "../components/api-authorization/AuthorizeService";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface FetchDataState {
  forecasts: WeatherForecast[];
  loading: boolean;
}

export class FetchData extends Component<{}, FetchDataState> {
  static displayName = FetchData.name;

  constructor(props: {}) {
    super(props);
    this.state = { forecasts: [], loading: true };
  }

  componentDidMount(): void {
    this.populateWeatherData();
  }

  static renderForecastsTable(forecasts: WeatherForecast[]): JSX.Element {
    return (
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast) => (
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render(): JSX.Element {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderForecastsTable(this.state.forecasts)
    );

    return (
      <div>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData(): Promise<void> {
    const token = await authService.getAccessToken();
    const response = await fetch("api/weatherforecast", {
      headers: !token ? {} : { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
