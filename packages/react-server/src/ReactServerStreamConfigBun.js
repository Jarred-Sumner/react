/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

export type Chunk = string | ArrayBufferView | ArrayBufferLike;

export type Destination = {|
  write: (input: Chunk) => number,
  drain: () => number,
  close: () => void,
  closeWithError: (error: mixed) => void,
|};

export type PrecomputedChunk = Chunk;

export function scheduleWork(callback: () => void) {
  queueMicrotask(callback);
}

export function flushBuffered(destination: Destination) {
  destination.drain();
}

export function beginWriting(destination: Destination) {}

export function writeChunk(
  destination: Destination,
  chunk: PrecomputedChunk | Chunk,
): void {
  destination.write(chunk);
}

export function writeChunkAndReturn(
  destination: Destination,
  chunk: PrecomputedChunk | Chunk,
): boolean {
  return !!destination.write(chunk);
}

export function completeWriting(destination: Destination) {
  destination.drain();
}

export function close(destination: Destination) {
  destination.close();
}

const textEncoder = new TextEncoder();

export function stringToChunk(content: string): Chunk {
  return content;
}

export function stringToPrecomputedChunk(content: string): PrecomputedChunk {
  return textEncoder.encode(content);
}

export function closeWithError(destination: Destination, error: mixed): void {
  // $FlowFixMe: This is an Error object or the destination accepts other types.
  destination.closeWithError(error);
}
