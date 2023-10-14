import { useState } from "react";
import {
	Container,
	Button,
	Grid,
} from "@mui/material";
import {
	blue,
	orange,
	green,
} from "@mui/material/colors";

type frameStateData = {
	value: number;
	isBeingCompared: boolean;
	isBeingSwapped: boolean;
	isSwapped: boolean;
};

const bubble_sort = (
	xs: number[],
	size: number,
	states: frameStateData[][],
): void => {
	states.push([]);
	for (let i = 0; i < size; i++) {
		states[states.length - 1][i] = {
			value: xs[i],
			isBeingCompared: false,
			isBeingSwapped: false,
			isSwapped: false,
		};
	}

	let offset, k, a, b;

	for (offset = 0; offset < size; offset++) {
		for (k = 0; k < size - offset - 1; k++) {
			a = xs[k];
			b = xs[k + 1];

			states.push([]);
			for (let i = 0; i < size; i++) {
				states[states.length - 1][i] = {
					value: xs[i],
					isBeingCompared: i == k || i == k + 1,
					isBeingSwapped: false,
					isSwapped: false,
				};
			}

			if (a > b) {
				states.push([]);
				for (let i = 0; i < size; i++) {
					states[states.length - 1][i] = {
						value: xs[i],
						isBeingCompared: false,
						isBeingSwapped: i == k || i == k + 1,
						isSwapped: false,
					};
				}

				xs[k] = b;
				xs[k + 1] = a;

				states.push([]);
				for (let i = 0; i < size; i++) {
					states[states.length - 1][i] = {
						value: xs[i],
						isBeingCompared: false,
						isBeingSwapped: false,
						isSwapped: i == k || i == k + 1,
					};
				}
			}
		}
	}
	states.push([]);
	for (let i = 0; i < size; i++) {
		states[states.length - 1][i] = {
			value: xs[i],
			isBeingCompared: false,
			isBeingSwapped: false,
			isSwapped: false,
		};
	}
};

const prepareFrameStates =
	(): frameStateData[][] => {
		const states: frameStateData[][] = [];

		const data_set: number[] = [
			12, 3, 7, 17, 5, 2, 1, 6, 11, 14, 15, 9, 18,
			4, 16, 13, 20, 19, 10, 8,
		];

		bubble_sort(data_set, 20, states);

		return states;
	};

export const App = () => {
	const [frame, setFrame] = useState<number>(1);

	const [frameStates, _] = useState<
		frameStateData[][]
	>(() => {
		return prepareFrameStates();
	});

	const getNextFrame = () => {
		setFrame((prevFrame) => {
			if (prevFrame >= frameStates.length) {
				return prevFrame;
			}

			return prevFrame + 1;
		});
	};

	const getPrevFrame = () => {
		setFrame((prevFrame) => {
			if (prevFrame < 2) {
				return prevFrame;
			}
			return prevFrame - 1;
		});
	};

	return (
		<Container maxWidth="md">
			<Grid
				container
				spacing={2}
				alignItems="baseline"
			>
				<Grid
					item
					container
					columns={20}
					width="100%"
					sx={{
						height: "640px",
					}}
				>
					{frameStates[frame - 1].map(
						({
							value,
							isBeingCompared,
							isBeingSwapped,
							isSwapped,
						}) => {
							let bgColor = `hsl(0, 0%, ${Math.round(
								(value / 20) * 80,
							)}%)`;

							if (isBeingCompared) {
								bgColor = blue[400];
							}

							if (isBeingSwapped) {
								bgColor = blue[700];
							}

							if (isSwapped) {
								bgColor = blue[900];
							}

							return (
								<Grid
									key={value}
									item
									sm={1}
									height={`${
										(value / 20) * 640
									}px`}
									sx={{
										backgroundColor: bgColor,
									}}
								/>
							);
						},
					)}
				</Grid>

				<Grid
					item
					sm={6}
				>
					<Button
						fullWidth
						disabled={frame === 1}
						variant="contained"
						onClick={getPrevFrame}
					>
						Previous Frame
					</Button>
				</Grid>
				<Grid
					item
					sm={6}
				>
					<Button
						fullWidth
						variant="contained"
						disabled={frame >= frameStates.length}
						onClick={getNextFrame}
					>
						Next Frame
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};
