package issuetracker.be.util;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;

public class TimeLapseCalculator {
  private static final String SECOND_TIME_LAPSE = "초 전";
  private static final String MINUTE_TIME_LAPSE = "분 전";
  private static final String HOUR_TIME_LAPSE = "시간 전";
  private static final String DAY_TIME_LAPSE = "일 전";
  private static final String MONTH_TIME_LAPSE = "달 전";
  private static final String YEAR_TIME_LAPSE = "년 전";
  private static final String NONE = "";

  public static String between(LocalDateTime start, LocalDateTime end) {
    if (start.isAfter(end)) {
      throw new IllegalArgumentException("잘못된 날짜를 입력했습니다.");
    }

    LocalTime startTime = start.toLocalTime();
    LocalTime endTime = end.toLocalTime();

    LocalDate startDate = start.toLocalDate();
    LocalDate endDate = end.toLocalDate();

    Duration timeDiff = Duration.between(startTime, endTime);
    Period dateDiff = Period.between(startDate, endDate);

    if (dateDiff.isZero()) {
      return calculateTime(timeDiff);
    }
    return calculateDate(dateDiff);
  }

  private static String calculateTime(Duration timeDiff) {
    if (timeDiff.toHours() != 0) {
      return timeDiff.toHours() + HOUR_TIME_LAPSE;
    }
    if (timeDiff.toMinutes() != 0) {
      return timeDiff.toMinutes() + MINUTE_TIME_LAPSE;
    }
    return timeDiff.toSeconds() + SECOND_TIME_LAPSE;
  }

  private static String calculateDate(Period dateDiff) {
    if (dateDiff.getYears() != 0) {
      return dateDiff.getYears() + YEAR_TIME_LAPSE;
    }
    if (dateDiff.getMonths() != 0) {
      return dateDiff.getMonths() + MONTH_TIME_LAPSE;
    }
    if (dateDiff.getDays() != 0) {
      return dateDiff.getDays() + DAY_TIME_LAPSE;
    }
    return NONE;
  }
}
