package org.example.Gym2.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class SlideScheduleData {
    List<Date> dates;
    Map<String, List<Schedule>> entry;

    public SlideScheduleData(List<Date> dates, Map<String, List<Schedule>> entry) {
        this.dates = dates;
        this.entry = entry;
    }

    public List<Date> getDates() {
        return dates;
    }

    public void setDates(List<Date> dates) {
        this.dates = dates;
    }

    public Map<String, List<Schedule>> getEntry() {
        return entry;
    }

    public void setEntry(Map<String, List<Schedule>> entry) {
        this.entry = entry;
    }
}
