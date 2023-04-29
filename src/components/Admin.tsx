import { useState, useEffect } from "react";
import { Button, Space, message, Tooltip} from "antd";
import { CopyOutlined } from "@ant-design/icons";

const Admin = () => {
  const [loading, setLoading] = useState(false);
  const [mannaVouchers, setMannaVouchers] = useState<any[]>([]);

  const handleCopyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    message.success("Manna voucher code copied to clipboard.");
  };

  /*
  const handleGiveManna = async (balance: number | null) => {
    setLoading(true);
    if (!balance) {
      balance = parseInt(prompt("Enter Manna amount: ") || "0");
    }
    if (!balance) {
      setLoading(false);
      return;
    }
    const username = prompt("Enter username (or wallet address): ");
    if (!username) {
      setLoading(false);
      return;
    }
    const response = await fetch("/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });
    const result = await response.json();
    if (result.error) {
      message.error(result.error);
      setLoading(false);
      return;
    }    
    try {
      const response = await fetch("/api/givemanna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, balance }),
      });
      const result = await response.json();
      if (result.error) {
        message.error(result.error);
      }
      else if (result.success) {        
        message.success(`${balance} Manna given to ${username}.`);
      }
    } catch (error: any) {
      alert(`Failed to create manna: ${error.message}`);
    } 
    setLoading(false);
  };
  */

  const handleCreateManna = async (balance: number | null) => {
    setLoading(true);
    if (!balance) {
      balance = parseInt(prompt("Enter Manna amount: ") || "0");
    }
    if (!balance) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("/api/createmanna", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ balance }),
      });
      const result = await response.json();
      if (result.error) {
        message.error(result.error);
      }
      else if (result.mannaVoucher) {
        setMannaVouchers([...mannaVouchers, {code: result.mannaVoucher, balance: balance}]);
        message.success(`Manna voucher ${result.mannaVoucher} created`);
      }
    } catch (error: any) {
      alert(`Failed to create manna: ${error.message}`);
    } 
    setLoading(false);
  };

  return (
    <div>
      <h1>Create Manna Voucher</h1>
      <Space>
        <Button type="primary" onClick={() => handleCreateManna(10)} loading={loading}>
          10 Manna
        </Button>
        <Button type="primary" onClick={() => handleCreateManna(100)} loading={loading}>
          100 Manna
        </Button>
        <Button type="primary" onClick={() => handleCreateManna(1000)} loading={loading}>
          1,000 Manna
        </Button>
        <Button type="primary" onClick={() => handleCreateManna(null)} loading={loading}>
          Custom
        </Button>
      </Space>
      <p></p>
      <ul style={{"lineHeight": "2.5em"}}>
        {mannaVouchers.map((mannaVoucher) => (
          <li key={mannaVoucher.code}>
            <Space>
              <span style={{fontSize: "1.25em"}}>{mannaVoucher.code}</span>
              <span style={{fontSize: "1.25em"}}>({mannaVoucher.balance} Manna)</span>
              <span>
                <Tooltip title="Copy to clipboard">
                  <CopyOutlined onClick={() => handleCopyToClipboard(mannaVoucher.code)} />
                </Tooltip>
              </span>
            </Space>
          </li>
        ))}
      </ul>
      {/* <h1>Give Manna to User</h1>
      <Space>
        <Button type="primary" onClick={() => handleGiveManna(10)} loading={loading}>
          10 Manna
        </Button>
        <Button type="primary" onClick={() => handleGiveManna(100)} loading={loading}>
          100 Manna
        </Button>
        <Button type="primary" onClick={() => handleGiveManna(1000)} loading={loading}>
          1,000 Manna
        </Button>
        <Button type="primary" onClick={() => handleGiveManna(null)} loading={loading}>
          Custom
        </Button>
      </Space> */}
    </div>
  );
};

export default Admin;
