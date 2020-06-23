package org.example.Gym2.domain;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class SlideScheduleData {
    List<Date> dates;
    Map<String, List<Set<Schedule>>> entry;


    public SlideScheduleData(List<Date> dates, Map<String, List<Set<Schedule>>> entry) {
        this.dates = dates;
        this.entry = entry;
    }

    public Map<String, List<Set<Schedule>>> getEntry() {
        return entry;
    }

    public void setEntry(Map<String, List<Set<Schedule>>> entry) {
        this.entry = entry;
    }

    public List<Date> getDates() {
        return dates;
    }

    public void setDates(List<Date> dates) {
        this.dates = dates;
    }


}
