package org.example.Gym2.service;

import org.example.Gym2.domain.Schedule;
import org.example.Gym2.domain.SlideScheduleData;
import org.example.Gym2.domain.User;
import org.example.Gym2.repos.ScheduleRepo;
import org.example.Gym2.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ScheduleService {
    @Autowired
    ScheduleRepo scheduleRepo;

    @Autowired
    UserRepo userRepo;
    public void add(){
        Schedule schedule = new Schedule();
        schedule.setCountEmptyPlaces(0);
        schedule.setDateStart(new GregorianCalendar());
        schedule.setDateEnd(new GregorianCalendar());
        scheduleRepo.save(schedule);
    }

    public Schedule findById(long id){
        return  scheduleRepo.findById(id).get();
    }

    public List<Date> getDaysOfWeek(Date date){
        Calendar c = Calendar.getInstance();
        List<Date> dates = new ArrayList<>();
        c.setTime(date);
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        dates.add(c.getTime());
        c.set(Calendar.DAY_OF_WEEK, Calendar.TUESDAY);
        dates.add(c.getTime());
        c.set(Calendar.DAY_OF_WEEK, Calendar.WEDNESDAY);
        dates.add(c.getTime());
        c.set(Calendar.DAY_OF_WEEK, Calendar.THURSDAY);
        dates.add(c.getTime());
        c.set(Calendar.DAY_OF_WEEK, Calendar.FRIDAY);
        dates.add(c.getTime());
        c.set(Calendar.DAY_OF_WEEK, Calendar.SATURDAY);
        dates.add(c.getTime());
        c.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
        dates.add(c.getTime());
        LocalDate ds = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().plusDays(7);
        date = Date.from( ds.atStartOfDay(ZoneId.systemDefault()).toInstant());
        c.setTime(date);
        return dates;
    }

    public void setActivitiesInSchedule(User user,
                                        String name,
                                        String type,
                                        Integer duration,
                                        Integer countEmptyPlaces,
                                        String startTime,
                                        String StartDate) throws ParseException {
        user = userRepo.findById(user.getId()).get();
        Schedule schedule = new Schedule();

        Calendar calendarStartDate = new GregorianCalendar();
        SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm");
        calendarStartDate.setTime(sdf.parse(StartDate + " " + startTime));
        schedule.setDateStart(calendarStartDate);


        Calendar calendarEndDate = new GregorianCalendar();
        Date date = new SimpleDateFormat("dd-MM-yyyy HH:mm").parse(StartDate + " " + startTime);
        LocalDateTime localDateTime = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().plusMinutes(duration);
        calendarEndDate.set(localDateTime.getYear(), localDateTime.getMonthValue(), localDateTime.getDayOfMonth(), localDateTime.getHour(), localDateTime.getMinute(), localDateTime.getSecond());
        schedule.setDateEnd(calendarEndDate);

        schedule.setName(name);
        schedule.setUser(user);
        schedule.setType(type);
        schedule.setCountEmptyPlaces(countEmptyPlaces);
        DateTimeFormatter parser = DateTimeFormatter.ofPattern("HH:mm:ss");
        schedule.setDuration(LocalTime.parse("00:" + toCorrectDuration(duration) + ":00", parser));

        scheduleRepo.save(schedule);

    }

    public Set<Schedule> findAll(){
        return scheduleRepo.findAll();
    }

    public Map<String, List<Schedule>> getCorrectData(Date startDate, List<Date> date){
        Set<Schedule> data = findAll();
        String[] time = {"10:00", "11:00", "12:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"};

        Map<String,  List<Schedule>> result = initDataSchedule(time);
        List<Date> dates = getDaysOfWeek(startDate);

        DateTimeFormatter parser = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        for (List<Schedule> list : result.values()){
            refillingList(list, date);
        }
        for (Schedule s : data){
            for (int i = 0; i < dates.size(); i++){
                for (int indTime = 0; indTime < time.length; indTime++){

                    if (isCorrect(s, indTime, i, dates, time)){
                        List<Schedule> scheduleList = result.get(time[indTime]);
                        scheduleList.set(i, s);
                        result.put(time[indTime], scheduleList);
                    }

                }
            }
        }

        return  result;
    }

    private  Map<String, List<Schedule>> initDataSchedule(String[] time){
        Map<String,  List<Schedule>> result = new LinkedHashMap<>();
        for (int i = 0; i < time.length; i++){
            List<Schedule> list = new ArrayList<>();
            result.put(time[i], list);
        }
        return result;
    }

    private void refillingList(List<Schedule> list, List<Date> date){
        for (int i = 0; i < 7; i++){
            Schedule sc = new Schedule();
            Calendar calendarDate = new GregorianCalendar();
            calendarDate.setTime(date.get(i));
            sc.setDateStart(calendarDate);
            list.add(sc);
        }
    }

    private boolean isCorrect(Schedule s, int indTime, int i, List<Date> dates, String[] time){

        DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("HH:mm");
        if (indTime+1 < time.length){
            if (s.getDateStart().getTime().getDate() == dates.get(i).getDate() &&
                    s.getDateStart().getTime().getMonth() == dates.get(i).getMonth() &&
                    (LocalDateTime.ofInstant(s.getDateStart().toInstant(), ZoneId.systemDefault()).toLocalTime().isAfter(LocalTime.parse(time[indTime], formatterTime)) &&
                            LocalDateTime.ofInstant(s.getDateStart().toInstant(), ZoneId.systemDefault()).toLocalTime().isBefore(LocalTime.parse(time[indTime+1], formatterTime))||
                            LocalDateTime.ofInstant(s.getDateStart().toInstant(), ZoneId.systemDefault()).toLocalTime().equals(LocalTime.parse(time[indTime], formatterTime)))
            ){
                return true;
            }
        }else{
            if (s.getDateStart().getTime().getDate() == dates.get(i).getDate() &&
                    s.getDateStart().getTime().getMonth() == dates.get(i).getMonth() &&
                    (LocalDateTime.ofInstant(s.getDateStart().toInstant(), ZoneId.systemDefault()).toLocalTime().isAfter(LocalTime.parse(time[indTime], formatterTime))||
                            LocalDateTime.ofInstant(s.getDateStart().toInstant(), ZoneId.systemDefault()).toLocalTime().equals(LocalTime.parse(time[indTime], formatterTime)))
            ){

                return true;
            }
        }
        return false;
    }

    private void clearOldNotesInSchedule(Date startNewDate){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startNewDate);
        Set<Schedule> scheduleSet = scheduleRepo.findByDateStartLessThan(calendar);
        for (Schedule schedule : scheduleSet){
            if (schedule.getDateStart().getTime().getDate() < startNewDate.getDate()){
                scheduleRepo.delete(schedule);
            }

        }
    }

    private String toCorrectDuration(int duration){
        if (duration < 10){
            return "0" + duration;
        }
        return Integer.toString(duration);
    }

    public List<SlideScheduleData> getListSlideScheduleData(int countWeeks){

        Calendar c = Calendar.getInstance();
        Date date = new Date();
        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        Date monday = c.getTime();
        clearOldNotesInSchedule(monday);



        List<SlideScheduleData> slideScheduleData = new LinkedList<>();


        for (int i = 0; i < countWeeks; i++){
            List<Date> dates = getDaysOfWeek(date);
            Map<String, List<Schedule>> data = getCorrectData(date, dates);

            LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate().plusDays(7);
            date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

            slideScheduleData.add(new SlideScheduleData(dates, data));
        }
        return slideScheduleData;
    }


}
