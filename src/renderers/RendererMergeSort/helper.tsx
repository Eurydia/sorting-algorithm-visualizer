import { Fragment, ReactNode } from "react";

export type FrameState = {
	elementStates: number[];
	auxMemory: number[];
	frameDescription: ReactNode;
	memWriteCount: number;
	memReadCount: number;
	comparisonCount: number;

	workingRegion: number[];
	compared: number[];
	memRead: number[];
	memWrite: number[];
	memAuxRead: number[];
	memAuxWrite: number[];
};

export const mergeSort = (
	xs: number[],
	size: number,
	frameStates: FrameState[],
) => {
	let memWriteCount: number = 0;
	let memReadCount: number = 0;
	let comparisonCount: number = 0;

	const generateFrameState = (
		frameDescription: ReactNode,
		auxMemory: number[],
		indexDetails: {
			workingRegion: number[];
			compared: number[];
			memRead: number[];
			memWrite: number[];
			memAuxRead: number[];
			memAuxWrite: number[];
		},
	): void => {
		frameStates.push({
			frameDescription,
			auxMemory,
			elementStates: [...xs],
			memWriteCount,
			memReadCount,
			comparisonCount,

			...indexDetails,
		});
	};

	const __top_down_merge_sort = (
		startIndex: number,
		endIndex: number,
	): void => {
		generateFrameState(
			<Fragment>
				Consider elements between{" "}
				<code>
					input[{startIndex}:{endIndex}]
				</code>{" "}
				(inclusive).
			</Fragment>,
			[],
			{
				workingRegion: [startIndex, endIndex],
				compared: [],
				memRead: [],
				memWrite: [],
				memAuxRead: [],
				memAuxWrite: [],
			},
		);

		if (endIndex - startIndex === 0) {
			generateFrameState(
				<Fragment>
					Working region has only one element.
					Consider it sorted.
				</Fragment>,
				[],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: [],
					memWrite: [],
					memAuxRead: [],
					memAuxWrite: [],
				},
			);
			return;
		}

		const middleIndex: number = Math.floor(
			(startIndex + endIndex) / 2,
		);

		__top_down_merge_sort(
			startIndex,
			middleIndex,
		);

		__top_down_merge_sort(
			middleIndex + 1,
			endIndex,
		);

		generateFrameState(
			<Fragment>
				Merging left region (
				<code>
					input[{startIndex}:{middleIndex}]
				</code>
				) and right region (
				<code>
					input[
					{middleIndex + 1}:{endIndex}]
				</code>
				).
			</Fragment>,
			[],
			{
				workingRegion: [startIndex, endIndex],
				compared: [],
				memRead: [],
				memWrite: [],
				memAuxRead: [],
				memAuxWrite: [],
			},
		);

		let lPtr: number = startIndex;
		let rPtr: number = middleIndex + 1;
		let auxPtr: number = 0;
		const auxMemory = [];

		while (
			lPtr <= middleIndex &&
			rPtr <= endIndex
		) {
			comparisonCount++;
			generateFrameState(
				<Fragment>
					Compare <code>input[{lPtr}]</code>{" "}
					against <code>input[{rPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [lPtr, rPtr],
					memRead: [],
					memWrite: [],
					memAuxRead: [],
					memAuxWrite: [],
				},
			);
			if (xs[lPtr] > xs[rPtr]) {
				memReadCount++;
				memWriteCount++;
				auxMemory[auxPtr] = xs[rPtr];

				generateFrameState(
					<Fragment>
						Writing <code>input[{rPtr}]</code> to{" "}
						<code>auxMem[{auxPtr}]</code>.
					</Fragment>,
					[...auxMemory],

					{
						workingRegion: [startIndex, endIndex],
						compared: [],
						memRead: [startIndex + rPtr],
						memWrite: [],
						memAuxRead: [],
						memAuxWrite: [auxPtr],
					},
				);

				auxPtr++;
				rPtr++;
				continue;
			}

			memReadCount++;
			memWriteCount++;
			auxMemory[auxPtr] = xs[lPtr];

			generateFrameState(
				<Fragment>
					Writing <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: [startIndex + lPtr],
					memWrite: [],
					memAuxRead: [],
					memAuxWrite: [auxPtr],
				},
			);

			lPtr++;
			auxPtr++;
		}

		while (lPtr <= middleIndex) {
			memReadCount++;
			memWriteCount++;

			auxMemory[auxPtr] = xs[lPtr];

			generateFrameState(
				<Fragment>
					Writing <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: [startIndex + lPtr],
					memWrite: [],
					memAuxRead: [],
					memAuxWrite: [auxPtr],
				},
			);

			lPtr++;
			auxPtr++;
		}

		while (rPtr <= endIndex) {
			memReadCount++;
			memWriteCount++;
			auxMemory[auxPtr] = xs[rPtr];

			generateFrameState(
				<Fragment>
					Writing <code>input[{lPtr}]</code> to{" "}
					<code>auxMem[{auxPtr}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: [startIndex + rPtr],
					memWrite: [],
					memAuxRead: [],
					memAuxWrite: [auxPtr],
				},
			);

			rPtr++;
			auxPtr++;
		}

		for (let i = 0; i < auxPtr; i++) {
			memReadCount++;
			memWriteCount++;
			xs[startIndex + i] = auxMemory[i];
			generateFrameState(
				<Fragment>
					Writing <code>auxMem[{i}]</code> to{" "}
					<code>input[{startIndex + i}]</code>.
				</Fragment>,
				[...auxMemory],
				{
					workingRegion: [startIndex, endIndex],
					compared: [],
					memRead: [],
					memWrite: [startIndex + i],
					memAuxRead: [i],
					memAuxWrite: [],
				},
			);
		}
	};

	generateFrameState(
		<Fragment>
			Unsorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		[],
		{
			workingRegion: [],
			compared: [],
			memRead: [],
			memWrite: [],
			memAuxRead: [],
			memAuxWrite: [],
		},
	);

	__top_down_merge_sort(0, size - 1);

	generateFrameState(
		<Fragment>
			Sorted <code>input[0:{size - 1}]</code>.
		</Fragment>,
		[],
		{
			workingRegion: [],
			compared: [],
			memRead: [],
			memWrite: [],
			memAuxRead: [],
			memAuxWrite: [],
		},
	);
};
