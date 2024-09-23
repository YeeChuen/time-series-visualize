import { TRunProject, TRunTimeSeries } from "../../../types"

export type TCsvObject = {
    runProject: TRunProject,
    runTimeSeries: TRunTimeSeries[]
} | undefined