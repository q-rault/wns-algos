/**
 * In this challenge, you have to split up a video in several successive segments
 * that can be either segments with notes or without.
 *
 * Successive = the end time of a segment must be the start time of the next one.
 * Also FYI, duration are in the format "HH:mm:ss" (hours, minutes, seconds)
 *
 * Example:
 * Input: {
 *      videoDuration: "01:33:12",
 *      notes: [
 *          { fromTime: "00:05:23", toTime: "00:15:10", note: "NodeJS presentation" },
 *          { fromTime: "00:26:12", toTime: "00:51:02", note: "Installation" },
 *          { fromTime: "00:51:02", toTime: "00:53:55", note: "Execution" },
 *          { fromTime: "01:01:48", toTime: "01:07:29", note: "Livereloading" },
 *          { fromTime: "00:16:12", toTime: "00:24:39", note: "NodeJS concepts" }
 *      ]
 * }
 * Ouput: [
 *      { fromTime: "00:00:00", toTime: "00:05:23" },
 *      { fromTime: "00:05:23", toTime: "00:15:10", note: "NodeJS presentation" },
 *      { fromTime: "00:15:10", toTime: "00:16:12" },
 *      { fromTime: "00:16:12", toTime: "00:24:39", note: "NodeJS concepts" },
 *      { fromTime: "00:24:39", toTime: "00:26:12" },
 *      { fromTime: "00:26:12", toTime: "00:51:02", note: "Installation" },
 *      { fromTime: "00:51:02", toTime: "00:53:55", note: "Execution" },
 *      { fromTime: "00:53:55", toTime: "01:01:48" },
 *      { fromTime: "01:01:48", toTime: "01:07:29", note: "Livereloading" }
 *      { fromTime: "01:07:29", toTime: "01:33:12" },
 * ]
 */

import { nextTick } from 'process';

// ↓ uncomment bellow lines and add your response!

function humanReadable(seconds:number):string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  return doubleDigits(h) + ':' + doubleDigits(m) + ':' + doubleDigits(s);
}
const add0toValue = (value:number):string => {
  return '0' + value.toString();
};

const doubleDigits = (value:number):string => {
  return value < 10 ? add0toValue(value) : value.toString();
};

const toSeconds = (string: string): number => {
  const HH = parseInt(string.slice(0, 2));
  const MM = parseInt(string.slice(3, 5));
  const SS = parseInt(string.slice(6, 8));
  return HH * 60 * 60 + MM * 60 + SS;
};

export default function ({ video }: { video: VideoWithNotes }): VideoSegment[] {
  const endLandmark = toSeconds(video.videoDuration);

  const landmarks = video.notes.flatMap((note) => [
    toSeconds(note.fromTime),
    toSeconds(note.toTime),
  ]);

  const uniqueSortedLandmarks = [
    ...new Set([0, ...landmarks, endLandmark]),
  ].sort((a, b) => a - b);

  let newTimeSlices: VideoSegment[] = [];
  for (let index = 0; index < uniqueSortedLandmarks.length - 1; index++) {
    newTimeSlices = [
      ...newTimeSlices,
      {
        fromTime: humanReadable(uniqueSortedLandmarks[index]),
        toTime: humanReadable(uniqueSortedLandmarks[index + 1]),
      },
    ];
  }
  const topics = uniqueSortedLandmarks.map(
    (landmark: number): string | null => {
      let foundTopic: string | null = null;
      video.notes.forEach((note) => {
        if (toSeconds(note.fromTime) === landmark) {
          foundTopic = note.note;
        }
      });
      return foundTopic;
    }
  );

  const videoSegments = newTimeSlices.map(
    (newTimeSlice: VideoSegment, index: number): VideoSegment => {
      if (topics[index]) {
        return { ...newTimeSlice, note: <string>topics[index] };
      }
      return newTimeSlice;
    }
  );
  return videoSegments;
}

// used interfaces, do not touch
export interface VideoWithNotes {
  videoDuration: string;
  notes: { fromTime: string; toTime: string; note: string }[];
}

export interface VideoSegment {
  fromTime: string;
  toTime: string;
  note?: string;
}
