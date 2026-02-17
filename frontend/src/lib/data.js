export const FilterType = {
  all: "All",
  active: "Working",
  completed: "Completed",
};

export const options = [
  {
    value: "today",
    label: "Today"
  },
  {
    value: "thisWeek",
    label: "This Week"
  },
  {
    value: "thisMonth",
    label: "This Month"
  },
  {
    value: "all",
    label: "All Time"
  }
  
]

export default visibleTaskLimit = 4;