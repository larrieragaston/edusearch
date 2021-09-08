import React from "react";
import { Result, Button } from "antd";
import { navigate } from "@reach/router";

export default function Careers() {
	return (
		<React.Fragment>
			<Result
				status="warning"
				title="Página Careers en desarrollo"
				extra={
					<Button
						type="primary"
						key="backToHome"
						onClick={() => navigate("/dashboard")}
					>
						Volver al inicio
					</Button>
				}
			/>
		</React.Fragment>
	);
}
