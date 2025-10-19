import { Editor } from "@tiptap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTable,
  faPlus,
  faMinus,
  faTrash,
  faColumns,
  faSliders,
  faGripLines,
  faChevronDown,
  faArrowRight,
  faArrowLeft,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface TableActionsMenuProps {
  editor: Editor;
  className?: string;
}

const TableActionsMenu = ({
  editor,
  className = "",
}: TableActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) return null;

  const tableActions = [
    // Insert Table
    {
      label: "Insert Table",
      icon: faTable,
      action: () =>
        editor
          .chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
      disabled: false,
    },
    // Row Operations
    {
      label: "Add Row Before",
      icon: faPlus,
      action: () => editor.chain().focus().addRowBefore().run(),
      disabled: !editor.can().addRowBefore(),
    },
    {
      label: "Add Row After",
      icon: faPlus,
      action: () => editor.chain().focus().addRowAfter().run(),
      disabled: !editor.can().addRowAfter(),
    },
    {
      label: "Delete Row",
      icon: faMinus,
      action: () => editor.chain().focus().deleteRow().run(),
      disabled: !editor.can().deleteRow(),
    },
    // Column Operations
    {
      label: "Add Column Before",
      icon: faPlus,
      action: () => editor.chain().focus().addColumnBefore().run(),
      disabled: !editor.can().addColumnBefore(),
    },
    {
      label: "Add Column After",
      icon: faPlus,
      action: () => editor.chain().focus().addColumnAfter().run(),
      disabled: !editor.can().addColumnAfter(),
    },
    {
      label: "Delete Column",
      icon: faMinus,
      action: () => editor.chain().focus().deleteColumn().run(),
      disabled: !editor.can().deleteColumn(),
    },
    // Cell Operations
    {
      label: "Merge Cells",
      icon: faGripLines,
      action: () => editor.chain().focus().mergeCells().run(),
      disabled: !editor.can().mergeCells(),
    },
    {
      label: "Split Cell",
      icon: faGripLines,
      action: () => editor.chain().focus().splitCell().run(),
      disabled: !editor.can().splitCell(),
    },
    // Header Operations
    {
      label: "Toggle Header Row",
      icon: faSliders,
      action: () => editor.chain().focus().toggleHeaderRow().run(),
      disabled: !editor.can().toggleHeaderRow(),
    },
    {
      label: "Toggle Header Column",
      icon: faColumns,
      action: () => editor.chain().focus().toggleHeaderColumn().run(),
      disabled: !editor.can().toggleHeaderColumn(),
    },
    {
      label: "Toggle Header Cell",
      icon: faTable,
      action: () => editor.chain().focus().toggleHeaderCell().run(),
      disabled: !editor.can().toggleHeaderCell(),
    },
    // Navigation
    {
      label: "Go to Next Cell",
      icon: faArrowRight,
      action: () => editor.chain().focus().goToNextCell().run(),
      disabled: !editor.can().goToNextCell(),
    },
    {
      label: "Go to Previous Cell",
      icon: faArrowLeft,
      action: () => editor.chain().focus().goToPreviousCell().run(),
      disabled: !editor.can().goToPreviousCell(),
    },
    // Table Management
    {
      label: "Delete Table",
      icon: faTrash,
      action: () => editor.chain().focus().deleteTable().run(),
      disabled: !editor.can().deleteTable(),
    },
    {
      label: "Fix Table",
      icon: faWrench,
      action: () => editor.chain().focus().fixTables().run(),
      disabled: false,
    },
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded hover:bg-ctp-surface1 text-ctp-text transition-colors flex items-center gap-1"
        title="Table Actions"
      >
        <FontAwesomeIcon icon={faTable} />
        <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-full left-0 mt-1 bg-ctp-surface0 border border-ctp-surface1 rounded-lg shadow-lg z-20 min-w-[200px] max-h-[400px] overflow-y-auto">
            {tableActions.map((action, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                disabled={action.disabled}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-ctp-surface1 text-ctp-text transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                  index === 0 ? "border-b border-ctp-surface1" : ""
                }`}
              >
                <FontAwesomeIcon icon={action.icon} className="w-4" />
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TableActionsMenu;
