import { FC } from "react";
import {
  HISTORICAL_DATES_MOCK_DATA,
  HistoricalDates,
} from "widgets/historical-dates";

export const App: FC = () => (
  <div className="wrapper">
    <div className="container">
      <HistoricalDates
        intervals={HISTORICAL_DATES_MOCK_DATA}
        title={
          <>
            Исторические
            <br /> даты
          </>
        }
      />
    </div>
  </div>
);
