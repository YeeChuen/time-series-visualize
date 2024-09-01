import { TRunClient, TRunTimeSeries } from "../../../types"

export type TCsvObject = {
    runClient: TRunClient,
    runTimeSeries: TRunTimeSeries[]
} | undefined