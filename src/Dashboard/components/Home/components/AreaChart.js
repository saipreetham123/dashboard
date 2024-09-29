"use client"

import React, { useContext, useEffect }from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import './AreaChart.css'
import apiMethods from '../../../../apiconnector'
import { Urls }  from '../../../../data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../../shadcn/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../../shadcn/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../shadcn/select"
import { LoadingContext } from '../../../../LoadingContext';
const chartConfig = {
  visitors: {
    label: "Requests",
  },
  prevented: {
    label: "Prevented",
    color: "hsl(var(--chart-1))",
  },
  allowed: {
    label: "Allowed",
    color: "hsl(var(--chart-2))",
  }
}
const SamplechartData = [
  { date: "2024-07-01", MaliciousRequestCount: 222, TotalRequestCount: 150 },
  { date: "2024-07-02", MaliciousRequestCount: 97, TotalRequestCount: 180 },
  { date: "2024-07-03", MaliciousRequestCount: 167, TotalRequestCount: 120 },
  { date: "2024-07-04", MaliciousRequestCount: 242, TotalRequestCount: 260 },
  { date: "2024-07-05", MaliciousRequestCount: 373, TotalRequestCount: 290 },
  { date: "2024-07-06", MaliciousRequestCount: 301, TotalRequestCount: 340 },
  { date: "2024-07-07", MaliciousRequestCount: 245, TotalRequestCount: 180 },
  { date: "2024-07-08", MaliciousRequestCount: 409, TotalRequestCount: 320 },
  { date: "2024-07-09", MaliciousRequestCount: 59, TotalRequestCount: 110 },
  { date: "2024-07-10", MaliciousRequestCount: 261, TotalRequestCount: 190 },
  { date: "2024-07-11", MaliciousRequestCount: 327, TotalRequestCount: 350 },
  { date: "2024-07-12", MaliciousRequestCount: 292, TotalRequestCount: 210 },
  { date: "2024-07-13", MaliciousRequestCount: 342, TotalRequestCount: 380 },
  { date: "2024-07-14", MaliciousRequestCount: 137, TotalRequestCount: 220 },
  { date: "2024-07-15", MaliciousRequestCount: 120, TotalRequestCount: 170 },
  { date: "2024-07-16", MaliciousRequestCount: 138, TotalRequestCount: 190 },
  { date: "2024-07-17", MaliciousRequestCount: 446, TotalRequestCount: 360 },
  { date: "2024-07-18", MaliciousRequestCount: 364, TotalRequestCount: 410 },
  { date: "2024-07-19", MaliciousRequestCount: 243, TotalRequestCount: 180 },
  { date: "2024-07-20", MaliciousRequestCount: 89, TotalRequestCount: 150 },
  { date: "2024-07-21", MaliciousRequestCount: 137, TotalRequestCount: 200 },
  { date: "2024-07-22", MaliciousRequestCount: 224, TotalRequestCount: 170 },
  { date: "2024-07-23", MaliciousRequestCount: 138, TotalRequestCount: 230 },
  { date: "2024-07-24", MaliciousRequestCount: 387, TotalRequestCount: 290 },
  { date: "2024-07-25", MaliciousRequestCount: 215, TotalRequestCount: 250 },
  { date: "2024-07-26", MaliciousRequestCount: 75, TotalRequestCount: 130 },
  { date: "2024-07-27", MaliciousRequestCount: 383, TotalRequestCount: 420 },
  { date: "2024-07-28", MaliciousRequestCount: 122, TotalRequestCount: 180 },
  { date: "2024-07-29", MaliciousRequestCount: 315, TotalRequestCount: 240 },
  { date: "2024-07-30", MaliciousRequestCount: 454, TotalRequestCount: 380 },
  { date: "2024-08-01", MaliciousRequestCount: 165, TotalRequestCount: 220 },
  { date: "2024-08-02", MaliciousRequestCount: 293, TotalRequestCount: 310 },
  { date: "2024-08-03", MaliciousRequestCount: 247, TotalRequestCount: 190 },
  { date: "2024-08-04", MaliciousRequestCount: 385, TotalRequestCount: 420 },
  { date: "2024-08-05", MaliciousRequestCount: 481, TotalRequestCount: 390 },
  { date: "2024-08-06", MaliciousRequestCount: 498, TotalRequestCount: 520 },
  { date: "2024-08-07", MaliciousRequestCount: 388, TotalRequestCount: 300 },
  { date: "2024-08-08", MaliciousRequestCount: 149, TotalRequestCount: 210 },
  { date: "2024-08-09", MaliciousRequestCount: 227, TotalRequestCount: 180 },
  { date: "2024-08-10", MaliciousRequestCount: 293, TotalRequestCount: 330 },
  { date: "2024-08-11", MaliciousRequestCount: 335, TotalRequestCount: 270 },
  { date: "2024-08-12", MaliciousRequestCount: 197, TotalRequestCount: 240 },
  { date: "2024-08-13", MaliciousRequestCount: 197, TotalRequestCount: 160 },
  { date: "2024-08-14", MaliciousRequestCount: 448, TotalRequestCount: 490 },
  { date: "2024-08-15", MaliciousRequestCount: 473, TotalRequestCount: 380 },
  { date: "2024-08-16", MaliciousRequestCount: 338, TotalRequestCount: 400 },
  { date: "2024-08-17", MaliciousRequestCount: 50, TotalRequestCount: 420 },
  { date: "2024-08-18", MaliciousRequestCount: 315, TotalRequestCount: 350 },
  { date: "2024-08-19", MaliciousRequestCount: 235, TotalRequestCount: 180 },
  { date: "2024-08-20", MaliciousRequestCount: 177, TotalRequestCount: 230 },
  { date: "2024-08-21", MaliciousRequestCount: 82, TotalRequestCount: 140 },
  { date: "2024-08-22", MaliciousRequestCount: 81, TotalRequestCount: 120 },
  { date: "2024-08-23", MaliciousRequestCount: 252, TotalRequestCount: 290 },
  { date: "2024-08-24", MaliciousRequestCount: 294, TotalRequestCount: 220 },
  { date: "2024-08-25", MaliciousRequestCount: 201, TotalRequestCount: 250 },
  { date: "2024-08-26", MaliciousRequestCount: 213, TotalRequestCount: 170 },
  { date: "2024-08-27", MaliciousRequestCount: 420, TotalRequestCount: 460 },
  { date: "2024-08-28", MaliciousRequestCount: 233, TotalRequestCount: 190 },
  { date: "2024-08-29", MaliciousRequestCount: 78, TotalRequestCount: 130 },
  { date: "2024-08-30", MaliciousRequestCount: 340, TotalRequestCount: 280 },
  { date: "2024-08-31", MaliciousRequestCount: 178, TotalRequestCount: 230 },
  { date: "2024-09-01", MaliciousRequestCount: 178, TotalRequestCount: 200 },
  { date: "2024-09-02", MaliciousRequestCount: 470, TotalRequestCount: 410 },
  { date: "2024-09-03", MaliciousRequestCount: 103, TotalRequestCount: 160 },
  { date: "2024-09-04", MaliciousRequestCount: 439, TotalRequestCount: 380 },
  { date: "2024-09-05", MaliciousRequestCount: 88, TotalRequestCount: 140 },
  { date: "2024-09-06", MaliciousRequestCount: 294, TotalRequestCount: 250 },
  { date: "2024-09-07", MaliciousRequestCount: 323, TotalRequestCount: 370 },
  { date: "2024-09-08", MaliciousRequestCount: 385, TotalRequestCount: 320 },
  { date: "2024-09-09", MaliciousRequestCount: 438, TotalRequestCount: 480 },
  { date: "2024-09-10", MaliciousRequestCount: 155, TotalRequestCount: 200 },
  { date: "2024-09-11", MaliciousRequestCount: 92, TotalRequestCount: 150 },
  { date: "2024-09-12", MaliciousRequestCount: 492, TotalRequestCount: 420 },
  { date: "2024-09-13", MaliciousRequestCount: 81, TotalRequestCount: 130 },
  { date: "2024-09-14", MaliciousRequestCount: 426, TotalRequestCount: 380 },
  { date: "2024-09-15", MaliciousRequestCount: 307, TotalRequestCount: 350 },
  { date: "2024-09-16", MaliciousRequestCount: 371, TotalRequestCount: 310 },
  { date: "2024-09-17", MaliciousRequestCount: 475, TotalRequestCount: 520 },
  { date: "2024-09-18", MaliciousRequestCount: 107, TotalRequestCount: 170 },
  { date: "2024-09-19", MaliciousRequestCount: 341, TotalRequestCount: 290 },
  { date: "2024-09-20", MaliciousRequestCount: 408, TotalRequestCount: 450 },
  { date: "2024-09-21", MaliciousRequestCount: 169, TotalRequestCount: 210 },
  { date: "2024-09-22", MaliciousRequestCount: 317, TotalRequestCount: 270 },
  { date: "2024-09-23", MaliciousRequestCount: 480, TotalRequestCount: 530 },
  { date: "2024-09-24", MaliciousRequestCount: 132, TotalRequestCount: 180 },
  { date: "2024-09-25", MaliciousRequestCount: 141, TotalRequestCount: 190 },
  { date: "2024-09-26", MaliciousRequestCount: 434, TotalRequestCount: 380 },
  { date: "2024-09-27", MaliciousRequestCount: 448, TotalRequestCount: 490 },
  { date: "2024-09-28", MaliciousRequestCount: 149, TotalRequestCount: 200 },
  { date: "2024-09-29", MaliciousRequestCount: 103, TotalRequestCount: 160 },
  { date: "2024-09-30", MaliciousRequestCount: 446, TotalRequestCount: 400 },
]

export function Chart() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const [allproject, setallProject] = React.useState([])
  const [selectedProject, setSelectedProject] = React.useState(null)
  const [chartData, setChartData] = React.useState(null)
  const { onLoaderRaise } = useContext(LoadingContext);

  // Filter data based on the selected time range
  const filteredData = React.useMemo(() => {
    if (!chartData) return [];

    const now = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date();
    startDate.setDate(now.getDate() - daysToSubtract);
    onLoaderRaise(false);
    
    return chartData.filter((item) => {
      const date = new Date(item.date);
      return date >= startDate;
    });
  }, [chartData, timeRange]);

  useEffect(() => 
  {
    let data = {orgId: localStorage.getItem('OrgId')}
    //Start the loader
    onLoaderRaise(true,"Fetching Data");
    apiMethods.Post(Urls.GetAllOrgProjects, data).then(async function (response){
      onLoaderRaise(false);
      if(response && !response.isFailure)
      {
        const updatedProjects = [...allproject, ...response.data];
        setallProject(updatedProjects)

        // Set the first project's ID as the initial state
        if (response.data.length > 0) {
          setSelectedProject(response.data[0].projectID);
        }
        else{
        console.log(response);
        }
      }
      else{
        console.log(response);
      }

    })
  }, [])

  useEffect(() => {
    if (selectedProject) {
      //Make an API Call to get Data and alter chartData
      onLoaderRaise(true,"Fetching Data");
      const now = new Date()
      let daysToSubtract = 90
      if (timeRange === "30d") {
        daysToSubtract = 30
      }
      const startDate = new Date();
      startDate.setDate(now.getDate() - daysToSubtract);
      onLoaderRaise(false);
      let data = { projectId: selectedProject, UserID: localStorage.getItem('userId'),  StartDate: startDate.toISOString(), EndDate: now.toISOString()}
      apiMethods.Post(Urls.GetMonthlyStats, data).then(async function (response) {
        if (response && !response.isFailure) {
          //let newdata = response.data.map(x => {return { date: x.DateTime, prevented: x.MaliciousRequestCount, allowed: x.TotalRequestCount}})
          let newdata = SamplechartData.map(x => {return { date: x.date, prevented: x.MaliciousRequestCount, allowed: x.TotalRequestCount}})
          setChartData(newdata)
        }
        else {
          console.log(true);
        // props.setToastParams("Error Logging in", "Error", true)
        }
      })

    }
  }, [selectedProject, timeRange]);

  useEffect(() => 
  {

  } ,[chartData]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Requests</CardTitle>
          <CardDescription>
            Showing total Requests for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue>
              {allproject.find((project) => project.projectID === selectedProject)?.name || 'Select a Project'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            {allproject.map((project) => (
              <SelectItem key={project.projectID} value={project.projectID} className="rounded-lg">
                {project.name}
              </SelectItem>
              ))
            }
            
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillPrevented" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-prevented)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-prevented)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillAllowed" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-allowed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-allowed)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="allowed"
              type="natural"
              fill="url(#fillAllowed)"
              stroke="var(--color-allowed)"
              stackId="a"
            />
            <Area
              dataKey="prevented"
              type="natural"
              fill="url(#fillPrevented)"
              stroke="var(--color-prevented)"
              stackId="c"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
